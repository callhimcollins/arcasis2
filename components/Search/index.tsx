import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Keyboard } from 'react-native'
import React, { useState } from 'react'
import getStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { Ionicons } from '@expo/vector-icons'
import { ProductType } from '@/types'
import { supabase } from '@/lib/supabase'
import crawlProduct from '@/utils/productCrawler'
import SearchItem from './SearchItem'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { clearNotification, setNotification } from '@/state/features/notificationSlice'

const Search = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const [input, setInput] = useState<string>('')
    const [searchItems, setSearchItems] = useState<ProductType[]>([])
    const [startedSearching, setStartedSearching] = useState<boolean>(false)
    const styles = getStyles(appearanceMode)
    const dispatch = useDispatch()


    const searchForItem = async () => {
        Keyboard.dismiss();
        if(!input.trim()) return;  
        try {
            setStartedSearching(true)
            const { data, error } = await supabase
                .from('Products')
                .select()
                .textSearch('name', `${input}`, {
                    type: 'websearch',
                    config: 'english',
                });
    
            if(data && data.length > 0) {
                console.log('Search results: ', data);
                setSearchItems(data)
            }

            if(data?.length === 0 || error || !data) {
                dispatch(setNotification({ message: `We're Getting The Products. This Might Take A Moment...`, messageType: 'info', notificationType: 'system', showNotification: true, stay: true }))
                await crawlProduct(input)

                const { data: crawlData, error: crawlError } = await supabase
                .from('Products')
                .select()
                .textSearch('name', `${input}`, {
                    type: 'websearch',
                    config: 'english',
                });
                
                if(crawlData && crawlData.length > 0) {
                    dispatch(clearNotification())
                    setSearchItems(crawlData)
                } else {
                    dispatch(setNotification({ message: `We Couldn't Find Any Results For ${input}.`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
                }

                if(crawlError) {
                    dispatch(setNotification({ message: `An Error Occurred`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
                }
            }
        } catch (error) {
            console.error('Unexpected error in searchForItem:', error);
        }
    };
    


    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput keyboardType="web-search" onSubmitEditing={searchForItem} value={input} onChangeText={(text) => setInput(text)} style={styles.input} placeholder='What are you looking for?' placeholderTextColor={appearanceMode.secondaryTextColor}/>

                <TouchableOpacity onPress={searchForItem}>
                    <Ionicons name='search' size={24} color={appearanceMode.secondaryTextColor}/>
                </TouchableOpacity>
            </View>

            { searchItems.length > 0 ? <FlatList
                contentContainerStyle={{ paddingTop: 180, paddingBottom: 140 }}
                data={searchItems}
                renderItem={({ item }) => <SearchItem {...item} />}
            /> : <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}> { startedSearching ? 'No results found' : 'Start Searching...'} </Text>
                </View>
            }

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back To Chat</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/(order)/previewscreen')} style={styles.continueButton}>
                    <Text style={styles.continueButtonText}>Continue To Preview</Text>
                </TouchableOpacity>
            </View>

            {/* Top Gradient */}
            <LinearGradient
                colors={['#FFFFFF', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.gradient, styles.topGradient]}
                pointerEvents="none"
            />

            {/* Bottom Gradient */}
            <LinearGradient
                colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.9)', '#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.gradient, styles.bottomGradient]}
                pointerEvents="none"
            />
        </View>
    )
}

export default Search
