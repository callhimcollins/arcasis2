import { BotType, UserType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserStateType = Omit<UserType, "createdAt" | "updatedAt" >

const initialState:UserStateType = {
    userId: null,
    fullName: null,
    email: null,
    profileImageUrl: null,
    phoneNumber: null,
    stripe_customer_id: null,
    botMemories: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserStateType>) => {
            return action.payload
        },
        setBotData: (state, action: PayloadAction<BotType>) => {
            state.botData = action.payload
        },
        removeUser: (state) => {
            return initialState
        },
        setBotMemories: (state, action) => {
            state.botMemories = action.payload
        },
        removeFromBotMemory: (state, action) => {
            const filteredBotMemories = state.botMemories && state.botMemories.filter(memory => memory.botMemoryId !== action.payload)
            state.botMemories = filteredBotMemories
        },
        setStripeCustomerID: (state, action) => {
            state.stripe_customer_id = action.payload
        }
    }
})

export const { setUser, setBotData, removeUser, setBotMemories, removeFromBotMemory, setStripeCustomerID } = userSlice.actions;
export default userSlice.reducer;