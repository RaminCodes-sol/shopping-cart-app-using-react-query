import { HiShoppingBag } from "react-icons/hi"
import { activeCart } from '../store/shoppingSlice'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"


const Navbar = () => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.shopping)
  const [ navBg, setNavBg] = useState(false)


  useEffect(() => {
    const scrollFunc = () => {
      if(window.scrollY >= 70) {
        setNavBg(true)
      } else {
        setNavBg(false)
      }
    }
    window.addEventListener('scroll', scrollFunc)

    return () => window.removeEventListener('scroll', scrollFunc)
  }, [])



  return (
    <nav className={`w-full px-8 py-6 flex justify-between transition-colors sticky top-0 ${navBg ? 'bg-[#141414]/90': 'bg-transparent'}`}>
      <h1></h1>
      <Link to="/" className="text-3xl font-bold text-orange-500">GoGoShop</Link>
      <div className="relative">
        <button onClick={() => dispatch(activeCart(true))} className="text-4xl text-white"><HiShoppingBag /></button>
        <span className="absolute top-[70%] right-0 pointer-events-none bg-orange-500 rounded-full inline-block w-[22px] h-[22px] flex justify-center items-center">{cartItems.length}</span>
      </div>
    </nav>
  )
}

export default Navbar