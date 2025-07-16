import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'

import Home from './pages/Home'
import InfiniteScroll from './pages/InfiniteScroll'

function App() {
  const [active, setActive] = useState('Home')

  const renderActiveComponent = () => {
    switch (active) {
      case 'Home':
        return <Home />
      case 'InfiniteScroll':
        return <InfiniteScroll />
      default:
        return (
          <div className="text-center text-gray-500 flex items-center justify-center h-full">
            <p>Select a component from the navigation</p>
          </div>
        )
    }
  }

  return (
    <>
      <NavBar setActive={setActive} />
      <div className='min-h-screen bg-gray-50'>
        <div className='container mx-auto p-6'>
          {renderActiveComponent()}
        </div>
      </div>
    </>
  )
}

export default App