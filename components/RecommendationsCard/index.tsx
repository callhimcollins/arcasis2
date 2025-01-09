import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import getStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { ProductType } from '@/types'
import { openai } from '@/lib/openAiConfig'
import { removeFromProductsFound } from '@/state/features/recommendationSlice'
import { setNotification } from '@/state/features/notificationSlice'

type RecommendationCardProps = {
    index: number;
    scrollX: SharedValue<number>;
    onCardPress?: (index: number) => void;
    data: ProductType,
    removeButton: (productId: string) => void;
}

const WIDTH = Dimensions.get('window').width
const RecommendationsCard = ({ index, scrollX, onCardPress, data, removeButton }: RecommendationCardProps) => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const [description, setDescription] = useState<string>('')
    const styles = getStyles(appearanceMode)

    // const descriptionProvider = async () => {
    //     try {
    //         const response = await openai.chat.completions.create({
    //             model: 'gpt-4o',
    //             messages: [
    //             { role: 'system', content: "You are a product description provider. Provide description based on the name you get. Make it very short. Only make descriptions like you are making for people from the ages of 14-32." },
    //             { role: 'user', content: data.name }
    //             ],
    //             temperature: 0
    //         })

    //         const aiMessage = response.choices[0].message.content;
    //         if(aiMessage) {
    //             setDescription(aiMessage)
    //         }
    //     } catch (error) {
    //         console.log('Error in determineIfConversationIsRecommendationsReady', error)
    //     }
    // }



    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [    
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index-1.25) * WIDTH, index * WIDTH, (index+1.25) * WIDTH],
                        [-WIDTH * 0.25, 0, WIDTH * 0.25],
                        Extrapolation.CLAMP
                    ),
                },
                {
                    scale: interpolate(
                        scrollX.value,
                        [(index-1) * WIDTH, index * WIDTH, (index+1) * WIDTH],
                        [0.9, 1, 0.9],
                        Extrapolation.CLAMP
                    )
                }
            ]
        }
    })


    useEffect(() => {
        // descriptionProvider()
    }, [])

    return (
        <Animated.View style={[styles.container, animatedStyles]} >
            <View style={styles.card}>
                <View style={styles.header}>
                    <Image style={styles.image} source={{uri: data?.imageUrl}}/>
                    <Text style={styles.price}>${data.price}</Text>
                </View>
                <Text style={styles.name}>{data?.name}</Text>
                <Text style={styles.description}>{description}</Text>

                <TouchableOpacity onPress={() => removeButton(data.productId)} style={styles.removeButton}>
                    <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

export default RecommendationsCard
