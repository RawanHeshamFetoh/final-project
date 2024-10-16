import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], 
    subtotal: 0,
    shippingCost: 120, 
    total: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems(state, action) {
            state.items = action.payload;
            state.subtotal = action.payload.reduce((acc, item) => acc + item.price * item.quantity, 0);
            state.total = state.subtotal + state.shippingCost;
        },
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item) {
                item.quantity = quantity;
                state.subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
                state.total = state.subtotal + state.shippingCost;
            }
        },
        updateShippingCost(state, action) {
            state.shippingCost = action.payload;
            state.total = state.subtotal + state.shippingCost;
        },
    },
});

export const { setCartItems, updateQuantity, updateShippingCost } = cartSlice.actions;

export default cartSlice.reducer;
