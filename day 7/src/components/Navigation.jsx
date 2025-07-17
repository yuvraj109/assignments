import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartTotalItems } from '../store/selectors'
import { setSearchTerm } from '../store/slices/productsSlice'
import { useState } from 'react'

const Navigation = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const cartItems = useSelector(selectCartTotalItems)
  const wishlistItems = useSelector(state => state.wishlist.items.length)
  const searchTerm = useSelector(state => state.products.searchTerm)

  const isActive = (path) => location.pathname === path

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-blue-600 shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-white">
            MyShop
          </Link>
          
          {location.pathname === '/' && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 rounded-md border-0 bg-white text-gray-900"
              />
            </div>
          )}
          
          <div className="hidden md:flex items-center space-x-8">
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
                  : 'text-blue-100 hover:text-white hover:bg-blue-500'
              }`}
            >
              Orders
            </Link>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {location.pathname === '/' && (
          <div className="md:hidden mt-3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 rounded-md border-0 bg-white text-gray-900"
            />
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 pb-3">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/') 
                    ? 'bg-blue-700 text-white' 
                    : 'text-blue-100 hover:text-white hover:bg-blue-500'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
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
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart
                {cartItems > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 inline-flex items-center justify-center">
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
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Wishlist
                {wishlistItems > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 inline-flex items-center justify-center">
                    {wishlistItems}
                  </span>
                )}
              </Link>
              
              <Link 
                to="/orders" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/orders') 
                    ? 'bg-blue-700 text-white' 
                    : 'text-blue-100 hover:text-white hover:bg-blue-500'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Orders
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
