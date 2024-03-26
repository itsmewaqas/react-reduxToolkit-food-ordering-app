import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

const restaurantSlice = createSlice({
    name: 'restaurantSlice',
    initialState: {
        restaurantList: [],
        loading: false,
        error: null,
    },

    reducers: {
        addRestaurant: (state, action) => {
            state.restaurantList = [...state.restaurantList, action.payload];
        },

        removeRestaurant: (state, action) => {
            state.restaurantList = state.restaurantList.filter(x => x.id !== action.payload);
        },

        clearRestaurant: (state, action) => {
            state.restaurantList = []
        },
    },
});

export default restaurantSlice.reducer;
export const { addRestaurant, removeRestaurant,clearRestaurant } = restaurantSlice.actions;












