import { ProductType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RecommendationProps = {
    readyToRecommend: boolean;
    productsFound: ProductType[] | null;
    intialRecommendationData: string[] | null;
}

const intialState: RecommendationProps = {
    readyToRecommend: false,
    productsFound: null,
    intialRecommendationData: null
}

const recommendationSlice = createSlice({
    name: "recommendation",
    initialState: intialState,
    reducers: {
        setReadyToRecommend: (state, action: PayloadAction<boolean>) => {
            state.readyToRecommend = action.payload
        },
        setProductsFound: (state, action: PayloadAction<ProductType[]>) => {
            state.productsFound = action.payload
        },
        addToProductsFound: (state, action: PayloadAction<ProductType>) => {
            if (!state.productsFound) {
                state.productsFound = [action.payload];
            } else {
                // Check if product already exists by productId
                const exists = state.productsFound.some(
                    product => product.productId === action.payload.productId
                );
                
                // Only add if it doesn't exist
                if (!exists) {
                    state.productsFound.push(action.payload);
                }
            }
        },
        removeFromProductsFound: (state, action: PayloadAction<ProductType>) => {
            if (state.productsFound) {
                state.productsFound = state.productsFound.filter(
                    product => product.productId !== action.payload.productId
                );
                if (state.productsFound.length === 0) {
                    state.productsFound = null;
                }
            }
        },
        setInitialRecommendationData: (state, action: PayloadAction<string[]>) => {
            state.intialRecommendationData = action.payload
        },
        clearProductsFoundInRecommendations: (state) => {
            state.productsFound = null
        }
    }
});

export const {
    setReadyToRecommend,
    setProductsFound,
    addToProductsFound,
    // addMultipleToProductsFound,
    removeFromProductsFound,
    setInitialRecommendationData,
    clearProductsFoundInRecommendations
} = recommendationSlice.actions;

export default recommendationSlice.reducer;