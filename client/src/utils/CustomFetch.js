import axios from 'axios'

const CustomFetch = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default CustomFetch
