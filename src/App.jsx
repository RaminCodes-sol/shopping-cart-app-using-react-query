import { Routes, Route } from "react-router-dom"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import Cart from './components/Cart'
import { useSelector } from "react-redux"
import Navbar from "./components/Navbar"
import { AnimatePresence } from "framer-motion"




const App = () => {
  const { isActive } = useSelector(state => state.shopping)

  return (
    <div id='app'>
      { 
        <AnimatePresence>
          { isActive ? <Cart/> : '' }
        </AnimatePresence>
      }
      <Navbar />
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/product/:id' element={<ProductDetails />} />
      </Routes>
    </div>
  ) 
}

export default App
