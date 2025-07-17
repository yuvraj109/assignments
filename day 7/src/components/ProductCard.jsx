import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../store/slices/cartSlice'
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const wishlistItems = useSelector(state => state.wishlist.items)
  const isInWishlist = wishlistItems.includes(product.id)

  const handleAddToCart = () => {
    dispatch(addToCart(product.id))
  }

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(addToWishlist(product.id))
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-cover object-center"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-3 mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
         
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium "
          >
            Add to Cart
          </button>
          <button
            onClick={handleWishlistToggle}
            className={`px-3 py-2 rounded-md text-sm font-medium border transition-colors`}
          >
            {isInWishlist ? 'Remove' : 'Wishlist'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
