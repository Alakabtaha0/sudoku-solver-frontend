import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { userState } from '../utils/types';

const initialState: userState = {
    id: 0,
    name: '',
    description: '',
    puzzle: null,
    solution: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userState>) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.description = action.payload.description;
            state.puzzle = action.payload.puzzle;
            state.solution = action.payload.solution;
        },
        setSolution: (state, action: PayloadAction<Array<Array<object>>>) => {
            state.solution = action.payload;
        
        },
        resetUser: (state) => {
            state.id = 0;
            state.name = '';
            state.description = '';
            state.puzzle = null;
            state.solution = null;
        }
    }
});

export default userSlice.reducer;

export const { setUser, setSolution, resetUser } = userSlice.actions;