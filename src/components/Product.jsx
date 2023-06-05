import { Link } from "react-router-dom"
import { TiStar } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/shoppingSlice";



const Product = ({ product }) => {
  const { id, title, price, rating, thumbnail } = product
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.shopping)


  /*-------Add-To-Cart-------*/
  const AddItemToCart = (product) => {
    dispatch(addToCart(product))
  }

  /*-------Remove-From-Cart-------*/
  const RemoveItemFromCart = (id) => {
    dispatch(removeFromCart(id))
  }

    
  return (
    <div className="border px-[.5rem] py-[.7rem] rounded  border-[#2f2e2e] transition-all hover:border-[#444]">
       
      {/*-------Image-------*/}
      <figure className="h-[300px]">
        <Link to={`/product/${id}`}>
          <img src={thumbnail} alt='img' loading="lazy" />
        </Link>
      </figure>

      {/*-------Title-------*/}
      <div className="flex justify-between px-2 p-3">
        <h4 className='text-[1rem] font-semibold font-Roboto'>{title.length > 30 ? `${title.substring(0, 30)}...`: title}</h4>
        <h2 className="font-Roboto font-bold text-[.93rem]">${price}</h2>
      </div>

      {/*-------Rating-And-Button-------*/}
      <div className="flex justify-between items-center p-2 mt-3">
        <div className="flex items-center font-Roboto">
          <span className="text-[gold]"><TiStar /></span>
          <span className="text-[.85rem]">{rating}</span>
        </div>
        {
          cartItems.some(item => item.id === id)
            ? <button onClick={() => RemoveItemFromCart(id)} className="bg-black text-[.9rem] text-white p-[.57rem] rounded transition-colors hover:bg-black/90">remove from Cart</button>
            : <button onClick={() => AddItemToCart(product)} className="bg-black text-[.9rem] text-white p-[.57rem] rounded transition-colors hover:bg-black/90">add to cart</button>
        }           
      </div>

    </div>
  )
}

export default Product