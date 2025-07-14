import './App.css'
import { LocalStorageDemo } from './components/LocalStorageDemo'
import { DebounceDemo } from './components/DebounceDemo'
import { FetchDemo } from './components/FetchDemo'
import { CounterDemo } from './components/CounterDemo'
import { PreviousDemo } from './components/PreviousDemo'
import { ToggleDemo } from './components/ToggleDemo'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Custom React Hooks Demo</h1>
        <p>Day 4 Assignment - 6 Custom Hooks Implementation</p>
      </header>
      
      <main className="app-main">
        <div className="demos-grid">
          <LocalStorageDemo />
          <DebounceDemo />
          <FetchDemo />
          <CounterDemo />
          <PreviousDemo />
          <ToggleDemo />
        </div>
      </main>
    </div>
  )
}

export default App
