import { createSlice } from '@reduxjs/toolkit'

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
  },
  reducers: {
    addOrder: (state, action) => {
      const order = {
        id: Date.now(),
        items: action.payload.items,
        total: action.payload.total,
        date: new Date().toISOString(),
      }
      state.items.unshift(order)
    },
    clearOrders: (state) => {
      state.items = []
    },
  },
})

export const { addOrder, clearOrders } = ordersSlice.actions
export default ordersSlice.reducer
