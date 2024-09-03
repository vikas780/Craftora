import { useEffect, useState } from 'react'
import CustomFetch from '../utils/CustomFetch'
import { InrCurrency } from '../components/InrCurrency'
import { Link } from 'react-router-dom'
import ProductShimmerUI from '../components/ProductShimmerUI'
import { addToCart } from '../features/Cart/CartSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
function ProductContainer() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get('/allproducts', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        setProducts(response.data.products)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <ProductShimmerUI />
  }
  return (
    <div className='px-8 md:px-2 '>
      <h2 className='text-4xl font-bold text-gray-800 mb-12'>All Products</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6 '>
        {products.map((product) => {
          return <ProductsList key={product._id} {...product} />
        })}
      </div>
    </div>
  )
}
export function ProductsList({ _id, name, description, price, image }) {
  const { ProductQuantity } = useSelector((state) => state.Cart)

  //Storing required information of product, It will we sent to AddToCart reducer

  const sendProduct = {
    _id,
    name,
    description,
    price,
    image,
    ProductQuantity,
  }
  const dispatch = useDispatch()

  return (
    <div className=' rounded-2xl p-5  hover:-translate-y-2 transition-all relative bg-gray-100 '>
      <div className='w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4'>
        <div className='relative h-full w-full'>
          <img
            src={image}
            alt={name || 'Default alt text'}
            style={{ objectFit: 'contain' }}
            className='object-contain'
          />
        </div>
      </div>

      <div>
        <h3 className='text-lg font-extrabold text-gray-800 min-h-[3.5rem]'>
          {name}
        </h3>
        <p className='text-gray-600 text-sm mt-2 truncate cursor-pointer  lg:p-1'>
          {description}
        </p>

        <div className='flex justify-between align-middle'>
          <h4 className='text-lg text-gray-800 font-bold mt-2'>
            {InrCurrency(price)}
          </h4>
          <Link to={'/cart'}>
            <button
              onClick={() => {
                dispatch(addToCart({ sendProduct }))
              }}
              className='text-white font-semibold bg-slate-700 p-2 rounded hover:bg-slate-900 '
            >
              Add To Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductContainer
