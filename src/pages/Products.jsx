import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "../api/fetching"
import Product from "../components/Product"
import { useLayoutEffect, useState } from "react"




const Products = () => {
  const [inputValue, setInputValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')


  /*--------Get-Products--------*/
  let { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
  })

  
  useLayoutEffect(() => {
    setSelectedCategory('all')
  } ,[])


  if (isLoading) return <h1 className="text-center mt-10">Loading...</h1>
  if (isError) return <h1>Error:{error.message}</h1>
  
  
  /*--------Get-Categories--------*/
  const categories = ['all', ...new Set(products.map(product => product.category))]



  return (
    <section className="w-full max-w-[1200px] mx-auto px-3 sm:px-7 py-1 pb-10 mt-4">

        {/*----------SearchInput----------*/}
        <div className='w-full max-w-[300px] mb-4'>
          <input type='text' placeholder='search...' value={inputValue} onChange={e => setInputValue(e.target.value)} className="text-black w-full py-2 px-2 outline-none border-none rounded-sm bg-[#444] text-white" />
        </div>

        {/*----------Title----------*/}
        <div className="flex flex-col justify-between mb-4 lg:flex-row gap-y-2">
          <h1 className="text-3xl py-2">Products</h1>
          <div className="flex flex-col lg:items-center gap-2 lg:flex-row px-2">
            <span className="mr-1">Categories:</span>
            <div className="flex gap-3 flex-wrap">
              { categories.map((category, indx) => <button onClick={() => {
                setSelectedCategory(category) 
                setInputValue('')
                }} key={indx} className="bg-white text-[.95rem] transition-colors duration-[.3s] hover:bg-[#444] hover:text-white text-black px-[.3rem] py-[.20rem] rounded">{category}</button>)}
            </div>
          </div>
        </div>

        {/*----------Products----------*/}
          <div className='products-container'>
            {
              inputValue.length
               ?
                  products?.map(product => {
                    if (product.title.toLowerCase().includes(inputValue.toLowerCase())) {
                      return <Product key={product.id} product={product} />
                    }
                  })
               : 
                  selectedCategory === 'all'
                    ? products?.map(product => <Product key={product.id} product={product} />)
                    : products?.map(product => product.category === selectedCategory && <Product key={product.id} product={product} />)
            }
        </div>
    </section>
  )
}

export default Products