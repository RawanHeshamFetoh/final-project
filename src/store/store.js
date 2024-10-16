import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice= createSlice({
    name: "user",
    initialState: {
        userData:{},
        userId: null,
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
    },
})

export const { setUserId , setUserData} = userSlice.actions;

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});


export default store;