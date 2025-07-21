
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders, createOrder, updateOrder, deleteOrder } from '../../utils/fakeApi';

export const loadOrders = createAsyncThunk('orders/loadOrders', async () => {
  return await fetchOrders();
});

export const saveOrder = createAsyncThunk('orders/saveOrder', async (orderData) => {
  if (orderData.id) {
    return await updateOrder(orderData.id, orderData);
  } else {
    return await createOrder(orderData);
  }
});

export const removeOrder = createAsyncThunk('orders/removeOrder', async (orderId) => {
  await deleteOrder(orderId);
  return orderId;
});

const initialState = {
  orders: [],
  status: 'idle',
  error: null,
  filters: {
    status: '',
    urgent: '',
    search: '',
  },
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters(state) {
      state.filters = { status: '', urgent: '', search: '' };
    },
  },
  extraReducers: (builder) => {
    builder
      // Load orders
      .addCase(loadOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(loadOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Save order
      .addCase(saveOrder.fulfilled, (state, action) => {
        const existingIndex = state.orders.findIndex(order => order.id === action.payload.id);
        if (existingIndex >= 0) {
          state.orders[existingIndex] = action.payload;
        } else {
          state.orders.push(action.payload);
        }
      })
      // Remove order
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(order => order.id !== action.payload);
      });
  },
});

export const { setFilters, clearFilters } = ordersSlice.actions;
export default ordersSlice.reducer;
