import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [], // Cart items
    totalCartPrice: 0, // Total price of cart
    shippingCost: 120, // Fixed shipping cost
    total: 0, // Total cost (totalCartPrice + shipping)
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(
                (cartItem) => cartItem._id === item._id
            );

            if (existingItem) {
                // If item exists, increase its quantity
                existingItem.quantity += item.quantity;
            } else {
                // If item doesn't exist, add it to the cart
                state.items.push({ ...item });
            }

            // Update totalCartPrice and total
            state.totalCartPrice = state.items.reduce(
                (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
                0
            );
            state.total = state.totalCartPrice + state.shippingCost;
        },

        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item._id === id);
            if (item) {
                item.quantity = quantity;

                // Update totalCartPrice and total
                state.totalCartPrice = state.items.reduce(
                    (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
                    0
                );
                state.total = state.totalCartPrice + state.shippingCost;
            }
        },

        updateTotalCartPrice: (state, action) => {
            state.totalCartPrice = action.payload;
            state.total = state.totalCartPrice + state.shippingCost;
        },

        updateShippingCost(state, action) {
            state.shippingCost = action.payload;
            state.total = state.totalCartPrice + state.shippingCost;
        },

        deletePro: (state, action) => {
            state.items = state.items.filter((item) => item._id !== action.payload); // Remove item by id
        },

        // New clearCart reducer
        clearCart(state) {
            state.items = [];
            state.totalCartPrice = 0;
            state.total = state.shippingCost; // Reset total to just shipping cost
        }
    },
});

// Action creator to update totalCartPrice (if needed)
export const updateTotalCartPrice = (price) => ({
    type: 'cart/updateTotalCartPrice',
    payload: price,
});

export const { addToCart, updateQuantity, updateShippingCost, deletePro, clearCart } =
    cartSlice.actions;

export default cartSlice.reducer;
