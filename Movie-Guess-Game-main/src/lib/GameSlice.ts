import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchbar: false,
    rulesOpen: false,
    boxID: "",
}

export const gameSlice = createSlice({
    name: 'GameSlice',
    initialState,
    reducers: {
        setSearchBar: (state, action) => {
            state.searchbar = action.payload
        },
        setboxID: (state, action) => {
            state.boxID = action.payload
        },
        setRulesOpen: (state, action) => {
            state.rulesOpen = action.payload
        },
    },
})


export const { setSearchBar, setboxID, setRulesOpen } = gameSlice.actions
const GameSliceReducer = gameSlice.reducer
export default GameSliceReducer