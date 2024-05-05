import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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
        }
    }
});

// export const postSudokuAsync = createAsyncThunk(
//     "user/postSudoku",
//     async (url:string, data:any) => {
//         // Return the completed
//         return fetch(url, {
//             method: 'POST',
//             body: data,
//             headers: {
//                 // 'Content-Type': 'multipart/form-data',
//                 'Accept': '*/*',
//                 'Aceept-Encoding': 'gzip, deflate, br',
//                 'Connection': 'keep-alive',
//             }
//         }).then(blob => {
//             // Convert the blob to JSON
//             // Need to store the response in redux
//             const reader = new FileReader();
//             reader.onload = () => {
//                 console.log("Response JSON:: ", reader.result);
//                 return reader.result;
//             }
//         }).catch(err => {
//             console.error("Error: ", err);
//             return err;
//         });
//     }
// );


export default userSlice.reducer;

export const { setUser } = userSlice.actions;