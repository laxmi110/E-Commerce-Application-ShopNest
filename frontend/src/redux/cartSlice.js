import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const productId = item.productId || item._id;
            const normalizedItem = {
                ...item,
                productId,
                qty: Number(item.qty) || 1,
            };
            const existItem = state.cartItems.find((x) => (x.productId || x._id) === productId);
            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    (x.productId || x._id) === productId ? normalizedItem : x
                );
            } else {
                state.cartItems.push(normalizedItem);
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => (item.productId || item._id) !== action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem('cartItems');
        }
    },
});

export const { addToCart, removeFromCart , clearCart} = cartSlice.actions;
export default cartSlice.reducer;

