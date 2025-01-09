import { ChatBoxType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type ChatSliceProps = {
    conversationWrapped: boolean | null;
    chats: ChatBoxType[] | null;
    chatsContainerId: string | null;
    botReplying: boolean;
    botShouldReply: boolean;
    chatTopic: string;
    shouldCreateChatsContainer: boolean
}

const initialState:ChatSliceProps = {
    conversationWrapped: false,
    chats: null,
    chatsContainerId: null,
    botReplying: false,
    botShouldReply: true,
    chatTopic: '',
    shouldCreateChatsContainer: true,
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setConversationWrapped: (state, action) => {
            state.conversationWrapped = action.payload
        },
        setOrAddChat: (state, action) => {
            if(!state.chats) {
                state.chats = [action.payload]
            } else {
                state.chats.push(action.payload)
            }
        },
        setChatHistory: (state, action) => {
            state.chats = action.payload
        },
        removeChat: (state, action) => {
            if(state.chats) {
                const filteredChat = state.chats.filter(chat => chat.content !== action.payload)
                state.chats = filteredChat
            }
        },
        clearChats: (state) => {
            state.chats = null
        },
        setChatsContainerId: (state, action) => {
            state.chatsContainerId = action.payload
        },
        clearChatsContainerId: (state) => {
            state.chatsContainerId = null
        },
        setBotReplying: (state, action) => {
            state.botReplying = action.payload
        },
        setBotShouldReply: (state, action) => {
            state.botShouldReply = action.payload
        },
        setChatTopic: (state, action) => {
            state.chatTopic = action.payload
        },
        setShouldCreateChatsContainer: (state,action) => {
            state.shouldCreateChatsContainer = action.payload
        }
    }
})


export const { 
    setConversationWrapped, 
    setOrAddChat, 
    setChatsContainerId,
    clearChatsContainerId, 
    removeChat, 
    setBotReplying,
    clearChats,
    setChatHistory,
    setBotShouldReply,
    setChatTopic,
    setShouldCreateChatsContainer
} = chatSlice.actions
export default chatSlice.reducer