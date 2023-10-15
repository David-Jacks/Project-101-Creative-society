
import { createSlice } from '@reduxjs/toolkit'

const initialStatevalue = { liked: false, likes: 0};
export const likeSlice = createSlice({
    name:"likes",
    initialState: {value: initialStatevalue},
    reducers:{
        updateLike: (state, action) =>{
            state.value = action.payload;
        }     
    }
});

export const {updateLike} = likeSlice.actions
export default likeSlice.reducer;