import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartTotalItems } from '../store/selectors'
import { setSearchTerm } from '../store/slices/productsSlice'

const Navigation = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartTotalItems)
  const wishlistItems = useSelector(state => state.wishlist.items.length)
  const searchTerm = useSelector(state => state.products.searchTerm)

  const isActive = (path) => location.pathname === path

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }

  return (
    <nav className="bg-blue-600 shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white">
          E-Commerce
        </Link>
        
        {location.pathname === '/' && (
          <div className="flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 rounded-md border-0  bg-white text-gray-900"
            />
          </div>
        )}
        
        <div className="flex items-center space-x-8">
          <Link 
            to="/" 
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              isActive('/') 
                ? 'bg-blue-700 text-white' 
                : 'text-blue-100 hover:text-white hover:bg-blue-500'
            }`}
          >
            Dashboard
          </Link>
          
          <Link 
            to="/cart" 
            className={`px-3 py-2 rounded-md text-sm font-medium relative ${
              isActive('/cart') 
                ? 'bg-blue-700 text-white' 
                : 'text-blue-100 hover:text-white hover:bg-blue-500'
            }`}
          >
            Cart
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </Link>
          
          <Link 
            to="/wishlist" 
            className={`px-3 py-2 rounded-md text-sm font-medium relative ${
              isActive('/wishlist') 
                ? 'bg-blue-700 text-white' 
                : 'text-blue-100 hover:text-white hover:bg-blue-500'
            }`}
          >
            Wishlist
            {wishlistItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistItems}
              </span>
            )}
          </Link>
          
          <Link 
            to="/orders" 
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              isActive('/orders') 
                ? 'bg-blue-700 text-white' 
                : 'text-blue-100'
            }`}
          >
            Orders
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
