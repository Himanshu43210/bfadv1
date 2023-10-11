import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {},
    reducers: {
        storeChat: (state, action) => {
            state.push(action.payload);
        },
        clearChat: (state, action) => {
            return [];
        }
    }
});

export const { storeChat, clearChat } = chatSlice.actions;
export default chatSlice.reducer;