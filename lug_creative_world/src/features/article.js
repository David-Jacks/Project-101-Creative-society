
import { createSlice } from '@reduxjs/toolkit'

const initialStatevalue = { id:"", title: "", body: "", timeTakenToReadPost: 0, categories: "", description: "", isUpdate: false};
export const articleSlice = createSlice({
    name:"article",
    initialState: {value: initialStatevalue},
    reducers:{
        preview: (state, action) =>{
            state.value = action.payload;
        },
        update: (state, action) =>{
            state.value = action.payload;
        }     
    }
});

export const {preview, update} = articleSlice.actions
export default articleSlice.reducer;