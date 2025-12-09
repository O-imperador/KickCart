import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find(
                (item) => item.product.id === product.id
            );
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    product: product,
                    size: 42,
                    quantity: 1,
                });
            }
        },
        increaseQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.items.find((item) => item.product.id === productId);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const productId = action.payload;
            const item = state.items.find((item) => item.product.id === productId);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.items = state.items.filter((item) => item.product.id !== productId);
                }
            }
        },
    },
});

export const { addToCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
