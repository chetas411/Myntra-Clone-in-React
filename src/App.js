import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Shirts from './Pages/Shirts'
import ProductDetails from './Pages/ProductDetails'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Shirts />} />
        <Route path="/details" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
