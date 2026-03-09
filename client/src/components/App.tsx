import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Factions from './Factions'
import ArmyBuilder from './ArmyBuilder'

function App() {
  // Example: using "CL" faction for now
  return (
    <div className="app">
      <h1 className="text-3xl font-bold underline">Army Builder</h1>

      <ArmyBuilder faction="CL" />
    </div>
  )
}

export default App
