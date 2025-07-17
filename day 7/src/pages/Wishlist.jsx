import { useDispatch, useSelector } from 'react-redux'
import { removeFromWishlist } from '../store/slices/wishlistSlice'
import { addToCart } from '../store/slices/cartSlice'
import { selectWishlistItemsWithProducts } from '../store/selectors'

const Wishlist = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectWishlistItemsWithProducts)

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id))
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product.id))
  }

  const handleMoveToCart = (product) => {
    dispatch(addToCart(product.id))
    dispatch(removeFromWishlist(product.id))
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Wishlist</h1>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Your wishlist is empty</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Wishlist ({items.length} items)
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map(product => (
            <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
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
                <div className="space-y-2">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="w-full bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium "
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="w-full px-3 text-red-500 py-2 rounded-md text-sm font-medium border border-black"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
