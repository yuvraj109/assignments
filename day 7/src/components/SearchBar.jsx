import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '../store/slices/productsSlice'

const SearchBar = () => {
  const dispatch = useDispatch()
  const searchTerm = useSelector(state => state.products.searchTerm)

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }

  return (
    <div className="bg-gray-50 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}

export default SearchBar
