import { createSlice } from "@reduxjs/toolkit";

const reducerSlice = createSlice({
    name: "teams",
    initialState: { data: [] },
    reducers: {
        updateTeams: (state, action) => {
            const newState = [...new Set(action.payload.map(t => t))];
            state.data = newState
        }
    }
})

export const { updateTeams } = reducerSlice.actions
export const selectState = state => state.teams.data

export const reducer = reducerSlice.reducer
