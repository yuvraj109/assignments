import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, setSelectedCategory } from '../store/slices/productsSlice'

const CategoryFilter = () => {
  const dispatch = useDispatch()
  const { categories, selectedCategory, loading } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category))
  }

  if (loading || categories.length === 0) {
    return (
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-500">Loading categories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="max-w-7xl mx-auto">
        <div className="flex space-x-4  overflow-x-auto">
          <button
            onClick={() => handleCategoryChange('')}
            className={`px-4 py-2 text-sm font-medium ${
              selectedCategory === ''
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 '
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2   text-sm font-medium capitalize ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 '
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryFilter
