import { createSlice } from '@reduxjs/toolkit'

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const productId = action.payload
      if (!state.items.includes(productId)) {
        state.items.push(productId)
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(id => id !== productId)
    },
    clearWishlist: (state) => {
      state.items = []
    },
  },
})

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
