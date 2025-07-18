import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, limit = 10 }) => {
    const response = await fetch(`https://fakestoreapi.in/api/products?page=${page}&limit=${limit}`)
    const data = await response.json()
    return { ...data, page }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    hasMore: true,
    page: 1,
    searchTerm: '',
    total: 0,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    resetProducts: (state) => {
      state.items = []
      state.page = 1
      state.hasMore = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        const { products, page } = action.payload
        
        if (page === 1) {
          state.items = products
        } else {
          state.items = [...state.items, ...products]
        }
        
        state.page = page
        state.hasMore = products.length >= 10
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { setSearchTerm, resetProducts } = productsSlice.actions
export default productsSlice.reducer
