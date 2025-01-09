import { NotificationType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NotificationType = {
    notificationType: 'system',
    messageType: null,
    message: '',
    showNotification: false,
    stay: false,
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification: (state, action: PayloadAction<NotificationType>) => {
            return {
                ...action.payload,
                showNotification: true
            };
        },
        removeNotification: (state) => {
            state.showNotification = false;
        },
        clearNotification: (state) => {
            return initialState;
        }
    },
});

export const { setNotification, clearNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;