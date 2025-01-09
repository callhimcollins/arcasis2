import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import getStyles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@/lib/supabase';
import HistoryBox from './HistoryBox';
import { HistoryType } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { setNotification } from '@/state/features/notificationSlice';

const PAGE_SIZE = 20;

const History = () => {
    const appearanceMode = useSelector((state: RootState) => state.appearance.currentMode);
    const user = useSelector((state: RootState) => state.user);
    const styles = getStyles(appearanceMode);
    const [history, setHistory] = useState<HistoryType[]>([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const dispatch = useDispatch()

    const getHistory = async (pageNumber: number) => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);

        const { data, error } = await supabase
            .from('ChatsContainers')
            .select('*')
            .eq('userId', user.userId)
            .order('createdAt', { ascending: false })
            .range(pageNumber * PAGE_SIZE, (pageNumber + 1) * PAGE_SIZE - 1);

        if (data) {
            if (data.length < PAGE_SIZE) {
                setHasMore(false); // No more records to fetch
            }
            setHistory((prevHistory) => [...prevHistory, ...data]); // Append new data
        }

        if (error) {
            console.log('error', error);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        getHistory(0); // Fetch the first page on load
    }, []);

    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            setPage((prevPage) => {
                const nextPage = prevPage + 1;
                getHistory(nextPage);
                return nextPage;
            });
        }
    };

    const deleteHistory = async (historyId: string) => {
        try {
            const { data: orderData, error:orderError } = await supabase
            .from('Orders')
            .select('chatsContainerId')
            .eq('chatsContainerId', historyId)
            .neq('status', 'created')
            .neq('status', null)
            .single();

            if(orderData) {
                dispatch(setNotification({
                    message: "You Can't Delete A History That Has An Order",
                    messageType: 'error',
                    notificationType: 'system',
                    showNotification: true,
                    stay: false
                }))
                return;
            }

            if(orderError || !orderData) {
                const { error } = await supabase
                .from('ChatsContainers')
                .delete()
                .eq('chatsContainerId', historyId)
                .eq('userId', user.userId)
                .single();

                if(!error) {
                    const updatedHistory = history.filter((item) => item.chatsContainerId !== historyId);
                    setHistory(updatedHistory);
                    dispatch(setNotification({
                        message: "History Deleted",
                        messageType: 'success',
                        notificationType: 'system',
                        showNotification: true,
                        stay: false
                    }))
                } else {
                    console.log("Couldn't delete history", error);
                    dispatch(setNotification({
                        message: "Couldn't Delete History",
                        messageType: 'error',
                        notificationType: 'system',
                        showNotification: true,
                        stay: false
                    }))
                }
            }
        } catch (error) {
          console.log("An error occurred in deleteHistory", error);  
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>History</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name='close' size={28} color='black'/>
                </TouchableOpacity>
            </View>

            <FlatList
                contentContainerStyle={{ paddingTop: 50,paddingBottom: 50, gap: 25 }}
                data={history}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <HistoryBox historyBox={item} onDelete={deleteHistory} />}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5} // Load more when 50% of the bottom is visible
                ListFooterComponent={
                    isLoading ? <Text style={styles.loadingText}>Loading...</Text> : null
                }
            />

            {/* Top Gradient */}
            <LinearGradient
                colors={['#FFFFFF', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.gradient, styles.topGradient]}
            />

            {/* Bottom Gradient */}
            <LinearGradient
                colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.9)', '#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.gradient, styles.bottomGradient]}
            />
        </View>
    );
};

export default History;
