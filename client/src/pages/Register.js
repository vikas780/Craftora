import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../features/Authentication/UserAuth'
import { useNavigate } from 'react-router-dom'
const initialState = {
  name: '',
  email: '',
  password: '',
  role: 'customer',
  isMember: true,
}
const Register = () => {
  const [values, setValues] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, user } = useSelector((state) => state.UserAuth)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember, role } = values
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please fill out all fields')
      return
    }

    if (isMember) {
      dispatch(loginUser({ email: values.email, password: values.password }))
      // console.log(`email: ${values.email} password: ${values.password}`)
      // toast.success('Sucesfully logged the values')
      return
    }
    dispatch(registerUser({ name, email, password, role }))
    // console.log(
    //   `name: ${values.name} email: ${values.email} password: ${values.password} role: ${values.role}`
    // )
  }
  const toggle = () => {
    setValues({ ...values, isMember: !values.isMember })
  }
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/products')
      }, 1000)
    }
  }, [user, navigate])

  return (
    <div className='mt-4 flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8 max-w-96 mx-auto shadow-lg   '>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          {values.isMember ? 'Login in to your account' : 'Register an account'}
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form onSubmit={onSubmit} className='space-y-6 '>
          {!values.isMember && (
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Name
              </label>
              <div className='mt-2'>
                <input
                  name='name'
                  type='text'
                  value={values.name}
                  onChange={handleChange}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          )}
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Email address
            </label>
            <div className='mt-2'>
              <input
                name='email'
                type='email'
                value={values.email}
                onChange={handleChange}
                required
                autoComplete='email'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Password
              </label>
            </div>
            <div className='mt-2'>
              <input
                name='password'
                type='password'
                value={values.password}
                onChange={handleChange}
                required
                autoComplete='current-password'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
          {!values.isMember && (
            <div>
              <label>Select role: </label>
              <select
                value={values.role}
                name='role'
                onChange={handleChange}
                className='border-2 border-blue-300 rounded-md px-3 py-2'
              >
                <option value='customer'>Customer</option>
                <option value='artisan'>Artisan</option>
              </select>
            </div>
          )}

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </form>

        <p className='mt-4 text-center text-sm text-gray-500'>
          {values.isMember ? 'Not a member? ' : 'Already an member? '}
          <button
            onClick={toggle}
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Register
