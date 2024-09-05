import React, { useState } from 'react'
import { addNewProduct, imageUpload } from '../features/Artisan/Dashboard'

const ArtisanForm = ({ onClose, addProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    imageFile: null,
  })

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }))
  }

  const handleImage = () => {
    imageUpload(formData, setFormData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, description, price, image } = formData

    addNewProduct({ name, description, price, image })
    onClose()
    addProduct()
  }

  return (
    <div className='fixed inset-0 p-4 flex justify-center items-center w-full h-full z-50 overflow-auto font-sans'>
      <div className='fixed inset-0 bg-black bg-opacity-50'></div>

      <div className='relative w-full max-w-lg bg-white shadow-lg rounded-lg p-8 z-10'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none'
        >
          &times;
        </button>

        <div className='my-8 text-center'>
          <h4 className='text-3xl text-gray-800 font-extrabold'>
            Add a new product
          </h4>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
              placeholder='Enter product name'
              required
            />
          </div>

          <div>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700'
            >
              Description
            </label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
              placeholder='Enter product description'
              rows='4'
              required
            />
          </div>

          <div>
            <label
              htmlFor='price'
              className='block text-sm font-medium text-gray-700'
            >
              Price
            </label>
            <input
              type='number'
              id='price'
              name='price'
              value={formData.price}
              onChange={handleChange}
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
              placeholder='Enter product price'
              required
            />
          </div>
          <div>
            <label
              htmlFor='imageFile'
              className='block text-sm font-medium text-gray-700'
            >
              Upload Image
            </label>
            <div className='flex'>
              <input
                type='file'
                id='imageFile'
                name='imageFile'
                onChange={handleChange}
                className=' mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100'
              />
              <button
                type='button'
                onClick={handleImage}
                className=' flex justify-center w-16 py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Upload
              </button>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ArtisanForm
