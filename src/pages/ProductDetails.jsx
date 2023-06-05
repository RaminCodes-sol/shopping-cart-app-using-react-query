import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { fetchProduct } from "../api/fetching"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "../store/shoppingSlice"
import { useState } from "react"
import { motion } from 'framer-motion'



const ProductDetails = () => {
  const { id } = useParams()
  const { cartItems } = useSelector(state => state.shopping)
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState('')


  /*-------Fetching-Product-Data-------*/
  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['products', id],
    queryFn: () => fetchProduct(id),
  })

  /*-------AddToCart-------*/
  const addItemToCart = (product) => {
    dispatch(addToCart(product))
  }
  
  
  /*-------RemoveFromCart-------*/
  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id))
  }

  if (isLoading) return <h1 className="text-center mt-10">Loading...</h1>
  if (isError) return <h1>Error:{error.message}</h1>



  return (
    <section className="w-full flex items-center pb-7">
      <div className="w-full max-w-[1100px] h-full p-3 mx-auto grid grid-cols-1 gap-7 md:mt-8 md:grid-cols-2">

        {/*--------Product-Images--------*/}
        <div className="w-full h-full flex flex-col gap-3">
          <figure className="w-full h-[300px] lg:w-full lg:h-[300px]">
            <motion.img src={imageUrl.length ? imageUrl : product.thumbnail} alt='img' className="object-contain" />
          </figure>
          <div className="flex flex-row-reverse justify-center gap-3 md:gap-4">
            { 
              product.images.length < 2 
                ? ''
                : product.images.slice(0, 3).map((image, index) => (
                  <figure onClick={() => setImageUrl(image)} key={index} className="flex flex-col cursor-pointer w-[100px] h-[100px]">
                    <img src={image} className="w-full h-full" alt='img' />
                    <span className="w-full h-[5px] bg-black inline-block opacity-0"></span>
                  </figure>
                ))
            }
          </div>
        </div>


        {/*--------Product-Descriptions--------*/}
        <div className='font-Roboto flex flex-col gap-12 px-2 mt-2 md:mt-0'>
          <div className="flex justify-between font-Roboto">
            <h1 className="text-2xl sm:text-2xl font-bold">{product.title}</h1>
            <h3 className="text-xl sm:text-2xl">${product.price}</h3>
          </div>
          
          <div className="flex flex-col gap-3">
            <div>
              <span className="text-[.9rem]">Rating: </span> 
              {product.rating}
            </div>
            <div>
              <span className="text-[.9rem]">Brand: </span> 
              {product.brand}
            </div>
            <div>
              <span className="text-[.9rem]">Category: </span> 
              {product.category}
            </div>
          </div>
          
          <div>
            <span className="text-[.9rem]">Description: </span>
            <p className="pl-2">{product.description}</p>
          </div>

          <div>
            {
              cartItems.some(item => item.id === product.id)
                ? <button onClick={() => removeItemFromCart(product.id)} className="w-full flex-1 bg-black py-3 text-white text-[.95rem] rounded-s transition-colors hover:bg-black/70">Remove From Cart</button>
                : <button onClick={() => addItemToCart(product)} className="w-full flex-1 bg-black py-3 text-white text-[.95rem] rounded-s transition-colors hover:bg-black/70">Add To Cart</button>
            }
          </div>
        </div>

      </div>
    </section>
  )
}

export default ProductDetails