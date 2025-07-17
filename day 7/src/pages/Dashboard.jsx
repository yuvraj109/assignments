import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/slices/productsSlice'
import ProductCard from '../components/ProductCard'
import CategoryFilter from '../components/CategoryFilter'
import useInfiniteScroll from '../hooks/useInfiniteScroll'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { items, loading, error, hasMore, searchTerm, selectedCategory } = useSelector(state => state.products)

  useInfiniteScroll()

  const filteredProducts = useMemo(() => {
    return items.filter(product => {
      const matchesSearch = !searchTerm || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [items, searchTerm, selectedCategory])

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts({ page: 1, limit: 10 }))
    }
  }, [dispatch, items.length])

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CategoryFilter />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryFilter />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredProducts.length === 0 && !loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {loading && (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading...</p>
              </div>
            )}
            
            {!hasMore && filteredProducts.length > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No more products to load</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard
