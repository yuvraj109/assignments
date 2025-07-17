import { useDispatch, useSelector } from 'react-redux'
import { increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from '../store/slices/cartSlice'
import { addOrder } from '../store/slices/ordersSlice'
import { selectCartItemsWithProducts, selectCartTotal, selectCartTotalItems } from '../store/selectors'

const Cart = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItemsWithProducts)
  const total = useSelector(selectCartTotal)
  const totalItems = useSelector(selectCartTotalItems)

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id))
  }

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id))
  }

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleCheckout = () => {
    if (items.length > 0) {
      const orderItems = items.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }))
      dispatch(addOrder({ items: orderItems, total }))
      dispatch(clearCart())
      alert('Order placed successfully!')
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex items-center space-x-4 border-b border-gray-200 pb-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 text-sm hover:text-red-800 mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-base font-medium text-gray-900">
                  Total Items: {totalItems}
                </span>
                <span className="text-xl font-bold text-gray-900">
                  Total: ${total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
