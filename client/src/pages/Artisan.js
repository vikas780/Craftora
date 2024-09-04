import React, { useEffect, useState } from 'react'
import { ProductsList } from './Products'
import ProductShimmerUI from '../components/ProductShimmerUI'
import ArtisanForm from '../components/ArtisanForm'
import CustomFetch from '../utils/CustomFetch'

const Artisan = () => {
  const [products, setProducts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newProduct, setNewProduct] = useState(true)

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleProduct = () => {
    setNewProduct(!newProduct)
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await CustomFetch.get('/artisan', {
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
  }, [newProduct])

  if (isLoading) {
    return <ProductShimmerUI />
  }

  return (
    <div>
      <div className='flex justify-between '>
        <h2 className='text-4xl font-bold text-gray-800 mb-12 px-2'>
          My Products
        </h2>
        <div>
          <button
            onClick={handleModalToggle}
            className='px-4 py-2 text-white bg-[#007bff] rounded-md shadow-md hover:bg-[#3286e0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#255e9b]'
          >
            Create Product
          </button>

          {isModalOpen && (
            <ArtisanForm
              onClose={handleModalToggle}
              addProduct={handleProduct}
            />
          )}
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6 '>
        {products.map((product) => {
          return <ProductsList key={product._id} {...product} />
        })}
      </div>
    </div>
  )
}

export default Artisan
