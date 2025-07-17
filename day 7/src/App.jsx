
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Orders from './pages/Orders'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
