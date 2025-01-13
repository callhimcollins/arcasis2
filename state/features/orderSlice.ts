import { CartItemType, OrderType, ProductType, ShippingAddressType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OrderStateProps = {
    orderDetails: OrderType | null,
    cartItems: CartItemType[],
    cartProducts: ProductType[],
    subtotal: number,
    shippingAddress: ShippingAddressType | null,
    orderTotal: number
}

const initialState:OrderStateProps = {
    orderDetails: null,
    shippingAddress: null,
    cartItems: [],
    cartProducts: [],
    subtotal: 0,
    orderTotal: 0
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrderDetails: (state, action: PayloadAction<OrderType>) => {
            state.orderDetails = action.payload
        },
        setOrAddToCart: (state, action: PayloadAction<CartItemType>) => {
            if (!state.cartItems) {
                state.cartItems = [action.payload]
                state.subtotal = parseFloat(
                    state.cartProducts.reduce((acc, item) => acc + item.price, 0).toFixed(2)
                );
            } else {
                state.cartItems.push(action.payload)
                state.subtotal = parseFloat(
                    state.cartProducts.reduce((acc, item) => acc + item.price, 0).toFixed(2)
                );
            }
        },
        removeFromCart: (state, action: PayloadAction<CartItemType>) => {
            state.cartItems = state.cartItems.filter(item => item.productId !== action.payload.productId)
            state.subtotal = parseFloat(
                state.cartProducts.reduce((acc, item) => acc + item.price, 0).toFixed(2)
            );
        },
        addCartProductToState: (state, action: PayloadAction<ProductType>) => {
            if (!state.cartProducts) {
                state.cartProducts = [action.payload]
                state.subtotal = parseFloat(
                    state.cartProducts.reduce((acc, item) => acc + item.price, 0).toFixed(2)
                );
            } else {
                state.cartProducts.push(action.payload)
                state.subtotal = parseFloat(
                    state.cartProducts.reduce((acc, item) => acc + item.price, 0).toFixed(2)
                );
            }
        },
        removeCartProductFromState: (state, action: PayloadAction<ProductType>) => {
            state.cartProducts = state.cartProducts.filter(product => product.productId !== action.payload.productId)
            state.subtotal = parseFloat(
                state.cartProducts.reduce((acc, item) => acc + item.price, 0).toFixed(2)
            );
        },
        returnCartSubTotal: (state) => {
            state.subtotal = parseFloat(
                state.cartProducts.reduce((acc, item) => acc + item.price, 0).toFixed(2)
            );        
        },
        setShippingAddress: (state, action: PayloadAction<ShippingAddressType>) => {
            state.shippingAddress = action.payload
        },
        updateOrderStatus: (state, action) => {
            if(state.orderDetails) state.orderDetails.status = action.payload
        },
        clearOrderDetails: (state) => {
            state.orderDetails = null
        },
        clearCartProducts: (state) => {
            state.cartProducts = []
            state.subtotal = 0
        },
        setOrderTotal: (state, action) => {
            state.orderTotal = ((state.subtotal + action.payload) + (state.subtotal * .08) + 4).toFixed(2)
        }
    }
})


export const { 
    setOrderDetails, 
    setOrAddToCart, 
    removeFromCart, 
    addCartProductToState, 
    removeCartProductFromState, 
    returnCartSubTotal,
    setShippingAddress,
    updateOrderStatus,
    clearOrderDetails,
    clearCartProducts,
    setOrderTotal
} = orderSlice.actions
export default orderSlice.reducer