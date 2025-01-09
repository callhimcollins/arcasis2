import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import appearanceReducer from './features/appearanceSlice';
import chatReducer from './features/chatSlice'
import recommendationsReducer from './features/recommendationSlice';
import orderReducer from './features/orderSlice'
import notificationReducer from './features/notificationSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        appearance: appearanceReducer,
        chat: chatReducer,
        recommendations: recommendationsReducer,
        order: orderReducer,
        notification: notificationReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
