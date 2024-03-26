import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

const menuSlice = createSlice({
    name: 'menuSlice',
    initialState: {
        menuList: [],
        loading: false,
        error: null,
    },

    reducers: {

        addToCart: (state, action) => {
            state.menuList = addItem(state.menuList, action.payload)
        },

        incrementItem: (state, action) => {
            state.menuList = addExistingItem(state.menuList, action.payload)
        },

        decrementItem: (state, action) => {
            state.menuList = removeExistingItem(state.menuList, action.payload)
        },

        removeToCart: (state, action) => {
            Object.assign({}, state,
                state.menuList = [...state.menuList.filter(item => item.id !== action.payload)]
            )
        },

        ordersuccess: (state, action) => {
            state.menuList = []
        },

    },
});

const addItem = ((menuList, itemToAdd) => {
    const existingItem = menuList.find(item => item.id === itemToAdd.id);
    if (existingItem) {
        return menuList.map(item =>
            item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        )
    }
    else {
        return [...menuList, { ...itemToAdd, quantity: 1 }]
    }
});

const addExistingItem = ((menuList, itemToAdd) => {
    return menuList.map(item =>
        item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
    )
});

const removeExistingItem = ((menuList, itemToRemove) => {
    const existingItem = menuList.find(item => item.id === itemToRemove.id);
    console.log(existingItem);
    let newItem = [];
    if (existingItem.quantity <= 1) {
        newItem = menuList.filter((item) => (item.id !== existingItem.id))
    }
    else {
        newItem = menuList.map(item =>
            item.id === itemToRemove.id ? { ...item, quantity: item.quantity - 1 } : item
        )
    }
    return newItem;
});

export default menuSlice.reducer;
export const { addToCart, incrementItem, decrementItem, removeToCart, ordersuccess } = menuSlice.actions;












