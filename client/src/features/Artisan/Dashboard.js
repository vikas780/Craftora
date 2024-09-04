import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import CustomFetch from '../../utils/CustomFetch'

export const createNewProduct = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    try {
      const response = await CustomFetch.post('/product', user, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      toast.success('Product created successfully')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)
