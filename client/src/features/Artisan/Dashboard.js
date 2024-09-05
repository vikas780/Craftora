import { toast } from 'react-toastify'

import CustomFetch from '../../utils/CustomFetch'

export const addNewProduct = async (productDetails) => {
  try {
    await CustomFetch.post('/product', productDetails, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    toast.success('Product created successfully')
  } catch (error) {
    console.error('Error creating product:', error)
  }
}
export const imageUpload = async (formData, setFormData) => {
  const imageData = new FormData() // Create a new FormData instance
  imageData.append('image', formData.imageFile) // Use the correct reference to formData.imageFile

  try {
    const response = await CustomFetch.post('/upload', imageData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (response.data && response.data.image && response.data.image.src) {
      const imageUrl = response.data.image.src
      setFormData((prevData) => ({
        ...prevData,
        image: imageUrl,
      }))
      toast.success('Image uploaded successfully')
    } else {
      toast.error('Image upload failed')
    }
  } catch (error) {
    console.error('Error uploading image:', error)
  }
}
