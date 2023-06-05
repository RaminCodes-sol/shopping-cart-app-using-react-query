import { createSlice } from "@reduxjs/toolkit"



const shoppingSlice = createSlice({
    name: 'shopping',
    initialState: {
        cartItems: [],
        isActive: false
    },
    reducers: {
        addToCart: (state, { payload }) => {
            state.cartItems = [{ ...payload, amount: 1 }, ...state.cartItems]
        },
        removeFromCart: (state, { payload }) => {
            state.cartItems = state.cartItems.filter(item => item.id !== payload)
        },
        addItemAmount: (state, { payload }) => {
            state.cartItems = state.cartItems.map(item => item.id === payload ? { ...item, amount: item.amount + 1 } : item)
        },
        removeItemAmount: (state, { payload }) => {
            state.cartItems = state.cartItems.map(item => item.id === payload ? { ...item, amount: item.amount > 1 ? item.amount - 1 : 1 } : item)
        },
        activeCart: (state, { payload }) => {
            state.isActive = payload
        }
    }
})

export const { addToCart, removeFromCart, activeCart, addItemAmount, removeItemAmount } = shoppingSlice.actions
export default shoppingSlice.reducer