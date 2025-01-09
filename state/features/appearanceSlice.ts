import { AppearanceStateType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";


const darkMode:AppearanceStateType = {
    primaryColor: '#EE6642',
    backgroundColor: '#FFFFFF',
    secondaryBackgroundColor: '#FFFFFF',
    textColor: '#2C2C2C',
    secondaryTextColor: '#6D6D6D',
    faintColor: '#E3E3E3',
}

const lightMode:AppearanceStateType = {
    primaryColor: '#EE6642',
    backgroundColor: '#FFFFFF',
    secondaryBackgroundColor: '#FFFFFF',
    textColor: '#2C2C2C',
    secondaryTextColor: '#4D4D4D',
    faintColor: '#E3E3E3',
}

interface AppearanceProps {
    currentMode: AppearanceStateType;
    defaultMode: AppearanceStateType;
}

const initialState: AppearanceProps = {
    currentMode: lightMode,
    defaultMode: lightMode
}

const appearanceSlice = createSlice({
    name: "appearance",
    initialState,
    reducers: {
        setCurrentMode: (state, action) => {
            state.currentMode = action.payload
        }
    }
})


export const { setCurrentMode } = appearanceSlice.actions
export default appearanceSlice.reducer