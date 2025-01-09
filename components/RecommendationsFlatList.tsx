import React, { useEffect } from 'react'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { ProductType, RecommendationType } from '@/types'
import { View } from 'react-native';
import RecommendationsCard from './RecommendationsCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { usePathname } from 'expo-router';
import { removeCartProductFromState } from '@/state/features/orderSlice';
import { removeFromProductsFound } from '@/state/features/recommendationSlice';


type RecommendationsFlatListProps = {
    data: ProductType[] | null,
}
const RecommendationsFlatList = ({ data }: RecommendationsFlatListProps) => {
    const pathName = usePathname();
    const dispatch = useDispatch();
    const scrollX = useSharedValue(0)
    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x
        }
    })


    const handleRemoveButton = (product: ProductType) => {
        if(pathName === '/previewscreen') {
            dispatch(removeCartProductFromState(product))
            dispatch(removeFromProductsFound(product))
        } else if(pathName === '/'){
            dispatch(removeFromProductsFound(product))
        }
    }

    return <Animated.FlatList
    onScroll={onScrollHandler}
    data={data}
    horizontal={true}
    keyExtractor={(item, index) => index.toString()}
    pagingEnabled
    renderItem={({ item, index }) => (
        <RecommendationsCard removeButton={() => handleRemoveButton(item)}  index={index} scrollX={scrollX} data={item} />
    )}
    showsHorizontalScrollIndicator={false}
/>
}

export default RecommendationsFlatList
