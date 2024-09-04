import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://craftoras.onrender.com/api/v1'
    : 'http://localhost:5000/api/v1'

const CustomFetch = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default CustomFetch
