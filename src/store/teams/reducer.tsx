import { createSlice } from "@reduxjs/toolkit";

const initialState: any = { data: [] }

const reducerSlice = createSlice({
    name: "teams",
    initialState: initialState,
    reducers: {
        updateTeams: (state, action) => {
            const newState = [...new Set(action.payload.map((t: any) => t))];
            state.data = newState
        }
    }
})

export const { updateTeams } = reducerSlice.actions
export const selectState = (state: any) => state.teams.data

export const reducer = reducerSlice.reducer
