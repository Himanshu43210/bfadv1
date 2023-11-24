import { createSlice } from "@reduxjs/toolkit";

const initialValue = [{
    timestamp: new Date(),
    type: "res",
    payload: {
        text: "Hi! How can I help you?",
        link: "",
    }
}];

const chatSlice = createSlice({
    name: "chat",
    initialState: initialValue,
    reducers: {
        storeChat: (state, action) => {
            state.push(action.payload);
        },
        clearChat: (state, action) => {
            return initialValue;
        }
    }
});

export const { storeChat, clearChat } = chatSlice.actions;
export default chatSlice.reducer;