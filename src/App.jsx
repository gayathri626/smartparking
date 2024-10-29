import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Booking from './Pages/Booking'
import Map from './Pages/Map'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </>
  )
}

export default App
