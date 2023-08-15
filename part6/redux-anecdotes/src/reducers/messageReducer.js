import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        changeState(state, action) {
            const newState = action.payload
            return newState
        },
    }
})

export const { changeState } = messageSlice.actions

export const setNotification = (message, seconds) => {
    return dispatch => {
        dispatch(changeState(message))
        setTimeout(() => {
            dispatch(changeState(null))
        }, seconds * 1000)
    }    
}

export default messageSlice.reducer