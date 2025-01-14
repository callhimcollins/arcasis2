import { Platform, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import getStyles from './styles'
import { Camera, CameraView, CameraType, FlashMode } from 'expo-camera'
import { Feather, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { VideoView, useVideoPlayer } from 'expo-video'
import { router } from 'expo-router'
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system'
import { supabase } from '@/lib/supabase'
import { setNotification } from '@/state/features/notificationSlice'
import { useNavigation } from '@react-navigation/native'
// import * as SMS from 'expo-sms'

const PersonalizedVideo = () => {
    const appearanceMode = useSelector((state: RootState) => state.appearance.currentMode)
    const styles = getStyles(appearanceMode)
    const cameraRef = useRef<CameraView>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [facing, setFacing] = useState<CameraType>('front');
    const [video, setVideo] = useState<string>()
    const [flash, setFlash] = useState<FlashMode>('off');
    const [smsIsAvailable, setSmsIsAvailable] = useState<boolean>(false)
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const user = useSelector((state:RootState) => state.user)
    const order = useSelector((state:RootState) => state.order)
    const dispatch = useDispatch()
    

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const micPermission = await Camera.requestMicrophonePermissionsAsync();
            setHasCameraPermission(
                cameraPermission.status === 'granted' && 
                micPermission.status === 'granted'
            );
        })();
    }, [])


    const player = useVideoPlayer(video || '', player => {
        player.loop = true;
        player.play();
    });



    const handleFlip = () => {
        if (facing === 'back') {
            setFacing('front');
        } else {
            setFacing('back');
        }
    }

    const handleFlash = () => {
        if (flash === 'off') {
            setFlash('on');
        } else {
            setFlash('off');
        }
    }

    const recordVideo = async () => {
        if (cameraRef?.current) {
            setIsRecording(true);
            console.log('Starting recording...');
            try {
                const videoOptions = {
                    maxDuration: 60,
                    quality: '720p'
                };
                const data = await cameraRef.current.recordAsync(videoOptions);
                console.log('Data gotten:', data);
                if (data && data.uri) {
                    setVideo(data.uri);
                }
            } catch (error) {
                console.log("Couldn't record video:", error);
                setIsRecording(false);
            }
        } else {
            console.log('Camera reference is null or invalid.');
        }
    };

    const stopRecording = async () => {
        if (cameraRef?.current && isRecording) {
            try {
                await cameraRef.current.stopRecording();
                setIsRecording(false);
            } catch (error) {
                console.log("Couldn't stop recording video", error);
            }
        } else {
            console.log("No recording to stop.");
        }
    }

    const retake = () => {
        setVideo('')
    }

    const generateAccessCode = (): string => {
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let code = '';
        
        // Generate 7 random characters
        for (let i = 0; i < 7; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }
        
        return code;
    };

    const uploadVideoAndFireSend = async () => {
        if(!user.userId) return;
        try {
            if (!video) {
                throw new Error("No video selected");
            }
    
            dispatch(setNotification({ message: `Sending...`, messageType: 'info', notificationType: 'system', showNotification: true, stay: true }))
            
            // Get file details
            const fileName = video.split('/').pop();
            const fileExtension = fileName?.split('.').pop()?.toLowerCase();
            const validExtensions = ['mp4', 'mov', 'avi', 'mkv'];
            
            if (!fileExtension || !validExtensions.includes(fileExtension)) {
                throw new Error("Invalid file extension. Supported formats are .mp4, .mov, .avi, and .mkv.");
            }
    
            // Create unique file path
            const timestamp = new Date().getTime();
            const uniqueFileName = `${timestamp}-${fileName}`;
            const filePath = `${user.userId}/${uniqueFileName}`;
            
            // Read file as base64
            const base64 = await FileSystem.readAsStringAsync(String(video), {
                encoding: FileSystem.EncodingType.Base64
            });
            
            // Set proper content type
            const contentType = `video/${fileExtension}`;
            
            // Upload to Supabase
            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('arcasisStorage')
                .upload(filePath, decode(base64), {
                    contentType,
                    cacheControl: '3600',
                    upsert: false
                });
    
            if (uploadError) {
                throw new Error(`Upload error: ${uploadError.message}`);
            }
    
            if (!uploadData) {
                throw new Error('Upload failed - no data returned');
            }
    
            console.log("Upload successful:", uploadData);
    
            await getPublicUrl(filePath)
            // await sendSMSToRecipient()
    
        } catch (error) {
            console.error("Error in uploadAndSendVideo:", error);
            throw error;  // Re-throw to handle in calling code
        }
    };

    const getPublicUrl = async (url: string) => {
        const { data: urlData } = await supabase
        .storage
        .from('arcasisStorage')
        .getPublicUrl(url);

        if (!urlData || !urlData.publicUrl) {
            throw new Error('Failed to generate public URL');
        }

        console.log("Public URL:", urlData.publicUrl);
        await uploadToDatabase(urlData.publicUrl);
    }

    const uploadToDatabase = async (fileUrl: string) => {
        try {
            if(!user.userId && !order.orderDetails?.orderId) return;
            const { data, error } = await supabase
            .from('PersonalizedMessages')
            .insert({
                viewCode: generateAccessCode(),
                fileUrl,
                textMessage: null,
                senderuserId: user.userId,
                receiverPhoneNumber: order.shippingAddress?.phoneNumber
            })

            if(!error) {
                dispatch(setNotification({ message: `We Will Deliver Your Message To ${order.shippingAddress?.name}`, messageType: 'success', notificationType: 'system', showNotification: true, stay: true }))
                router.replace('/');
            }

            if(error) {
                console.log("Error inserting in database", error.message);
            }
        } catch (error) {
            console.log("An error occurred in uploadToDatabase:", error);
        }  
    }

    // const sendSMSToRecipient = async () => {
    //     const { result } = await SMS.sendSMSAsync(
    //         ['985-215-2633'],
    //         'Hey! Arcasis!',
            
    //     )
    //     console.log(result)
    // }

        // useEffect(() => {
    //     (async() => {
    //         const smsIsAvailable = await SMS.isAvailableAsync();
    //         setSmsIsAvailable(smsIsAvailable)
    //     })()
    // }, [])

    if (hasCameraPermission === null) {
        return <View />;
    } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Record Personal Video</Text>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
            
            { !video ? <CameraView
                flash={flash}
                facing={facing}
                ref={cameraRef}
                style={styles.camera}
                mode='video'
            >
                <View style={styles.cameraHeader}>
                    {/* <TouchableOpacity onPress={handleFlash}>
                        <Ionicons name='flash' color={ flash === 'on' ? '#FFD700' : 'white'} size={35}/>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={handleFlip}>
                        <MaterialIcons name={ Platform.OS === 'ios' ? 'flip-camera-ios' : 'flip-camera-android'} color={'white'} size={35} />
                    </TouchableOpacity>
                </View>
                <View style={styles.cameraFooter}>
                    {!isRecording ? 
                        <TouchableOpacity onPress={recordVideo}>
                            <Feather name='circle' color={'white'} size={75}/>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={stopRecording}>
                            <FontAwesome6 name='stop' color={'white'} size={65}/>
                        </TouchableOpacity>
                    }
                </View>
            </CameraView> : 
            <>
            <VideoView contentFit='cover' style={styles.video} player={player} allowsFullscreen allowsPictureInPicture/>
            <View style={styles.footer}>
                <TouchableOpacity onPress={retake} style={styles.backButton}>
                    <MaterialCommunityIcons name='camera-retake' color={'white'} size={28}/>
                    <Text style={styles.backButtonText}>Retake</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={uploadVideoAndFireSend} style={styles.continueButton}>
                    <Text style={styles.continueButtonText}>Send</Text>
                    <Ionicons name='send' color={'white'} size={28}/>
                </TouchableOpacity>
            </View>
            </>
            }
        </View>
    )
}

export default PersonalizedVideo
