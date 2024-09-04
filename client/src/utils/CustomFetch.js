import axios from 'axios'

const CustomFetch = axios.create({
  baseURL: 'https://craftoras.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default CustomFetch
