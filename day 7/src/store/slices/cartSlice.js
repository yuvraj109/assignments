import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    
    addToCart: (state, action) => {
      const productId = action.payload
      const existingItem = state.items.find(item => item.id === productId)      
      if (!existingItem) {
        state.items.push({ id: productId, quantity: 1 })
      }
    },

    removeFromCart: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(item => item.id !== productId)
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload
      const item = state.items.find(item => item.id === productId)
      if (item) {
        item.quantity += 1
      }
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload
      const item = state.items.find(item => item.id === productId)
      if (item && item.quantity > 1) {
        item.quantity -= 1
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter(item => item.id !== productId)
      }
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
