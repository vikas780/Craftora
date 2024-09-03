import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import axios from 'axios'

export const createNewProduct = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post('/product', user, {
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
