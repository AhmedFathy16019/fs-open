import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        changeMessage(state, action) {
            const message = action.payload
            return message
        },
        removeMessage(state, action) {
            return null
        }
    }
})

export const { changeMessage, removeMessage } = messageSlice.actions

export default messageSlice.reducer