import { createSlice } from '@reduxjs/toolkit'

const initialStatevalue = null;

export const userSlice = createSlice({
    name:"user",
    initialState: {value: initialStatevalue},
    reducers:{
        login: (state, action) =>{
            state.value = action.payload;
            localStorage.setItem("user", JSON.stringify(state.value));
        },
        logout: (state, action) =>
        {
            localStorage.clear();
        }     
    }
});

export const {login, logout} = userSlice.actions
export default userSlice.reducer;