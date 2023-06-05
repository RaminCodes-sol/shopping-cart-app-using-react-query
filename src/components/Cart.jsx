import { useDispatch, useSelector } from 'react-redux'
import { HiPlusSm, HiMinusSm } from "react-icons/hi"
import { BsTrash3Fill } from "react-icons/bs"
import { activeCart, addItemAmount, removeFromCart, removeItemAmount } from '../store/shoppingSlice'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'




const Cart = () => {
  const { cartItems } = useSelector(state => state.shopping)
  const dispatch = useDispatch()
  const [totalPrice, setTotalPrice] = useState(0)


  /*-------Remove-Item-------*/
  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id))
  }

  /*-------Add-Amount-------*/
  const addAmount = (id) => {
    dispatch(addItemAmount(id))
  }

  /*-------Remove-Amount-------*/
  const removeAmount = (id) => {
    dispatch(removeItemAmount(id))
  }

  /*-------Close-Cart-------*/
  const handleCloseCart = (e) => {
    if (e.target.id === 'wrapper') {
      dispatch(activeCart(false))
    }
  }


  /*-------Get-Total-Price-------*/
  useEffect(() => {
    const { total } = cartItems.reduce((acc, value) => {
      const { price, amount } = value
      const totalAmount = amount * price
      acc.total += totalAmount
      return acc

    }, { total: 0 })

    setTotalPrice(total)
  }, [cartItems])


  return (
    <motion.aside id='wrapper' onClick={(e) => handleCloseCart(e)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='w-[100%] h-screen fixed z-50 bg-black/50'>
      <section className='sm:w-full sm:max-w-[550px] h-full ml-auto bg-black flex flex-col px-3'>

        {/*--------Title--------*/}
        <div className='flex justify-between text-white mb-5 border-b border-orange-400 px-4 py-3'>
          <h1 className='text-2xl'>Cart Items</h1>
          <button onClick={() => dispatch(activeCart(false))}>Close</button>
        </div>


        {/*--------Items--------*/}
        {
          cartItems.length === 0
            ? <h1 className='text-center text-[.85rem]'>cart is empty</h1> 
            : <div className='flex flex-col gap-3 overflow-y-scroll h-[360px] border-b border-orange-400 py-3 px-2'>
                {
                  cartItems.map((item, index) => {
                    return (
                      <section key={index} title={item.title} className='flex gap-2 border justify-between items-center px-3 py-2 font-Roboto border-b border-[#444]'>
                        {/*------Image------*/}
                        <figure className='w-[90px] h-[90px]'>
                          <Link to={`/product/${item.id}`} onClick={() => dispatch(activeCart(false))}>
                            <img src={item.thumbnail} alt='img' />
                          </Link>
                        </figure>

                        {/*------Description------*/}
                        <div className='flex flex-col gap-2 flex-1 w-[110px] text-white ml-2 sm:ml-4'>
                          <h4 className='text-[.87rem] sm:text-[1rem]'>{item.title}</h4>
                          <h5 className='text-[.85rem]'>${item.price}</h5>
                          <div className='flex w-full gap-3 justify-start items-center'>
                            <button onClick={() => removeAmount(item.id)} className='text-2xl p-[.15rem]'><HiMinusSm /></button>
                            <span className='inline-block text-[1rem]'>{item.amount}</span>
                            <button onClick={() => addAmount(item.id)} className='text-2xl p-[.15rem]'><HiPlusSm /></button>
                          </div>
                        </div>

                        {/*------Remove-Button------*/}
                        <div>
                          <button onClick={() => removeItemFromCart(item.id)} className='text-white ml-auto text-[1.3rem] sm:text-[1.5rem]'><BsTrash3Fill /></button>
                        </div>
                      </section>
                    )
                  })
                }
              </div>
        }

        {/*--------Total-Price-Section--------*/}
        {
          cartItems.length === 0
            ? ''
            : <>
                <div className='mt-2'>
                  <ul className='flex flex-col gap-2 px-4'>
                    <li className='flex justify-between'>
                      <span>Subtotal:</span>
                      <h3>${totalPrice.length === 0 ? 0 : totalPrice.toFixed(1)}</h3>
                    </li>
                    <li className='flex justify-between'>
                      <span>Tax incl:</span> 
                      <h3>$1.7</h3>
                    </li>
                    <li className='flex justify-between'>
                      <span>Total:</span> 
                      <h3>${totalPrice.length === 0 ? 0 : (totalPrice + 1.7).toFixed(1)}</h3>
                    </li>
                  </ul>
                </div>

                <div className='mt-4'>
                  <button className='w-full bg-orange-500 py-3 transition-colors hover:bg-orange-600'>Checkout</button>
                </div>
              </>
        }
     
      </section>
    </motion.aside>
  )
}

export default Cart