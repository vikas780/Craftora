import React from 'react'
import { Link } from 'react-router-dom'
import { InrCurrency } from './InrCurrency'

const EmptyCart = () => {
  return (
    <div className='font-sans max-w-7xl max-md:max-w-[45rem] mx-auto p-4 '>
      <h1 className='text-2xl font-extrabold text-gray-800'>Your Cart</h1>
      <div className='grid md:grid-cols-3 gap-4 mt-8'>
        <div className='md:col-span-2 space-y-4'>
          <div className='flex gap-4 bg-white px-4 py-28 rounded-md shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]'>
            <div className='mt-4 max-w-4xl mx-auto text-center'>
              <h1 className='md:text-4xl text-3xl font-extrabold md:!leading-[75px]'>
                Your Cart is empty
              </h1>

              <div className='mt-2'>
                <Link to='/products'>
                  <button className=' text-sm  font-semibold tracking-wide px-6 py-3 rounded-md text-white bg-gray-600 transition-all hover:bg-gray-800'>
                    Fill IT
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]'>
          <ul className='text-gray-800 space-y-4'>
            <li className='flex flex-wrap gap-4 text-sm'>
              Subtotal{' '}
              <span className='ml-auto font-bold'>{InrCurrency(0)}</span>
            </li>
            <li className='flex flex-wrap gap-4 text-sm'>
              Shipping{' '}
              <span className='ml-auto font-bold'>{InrCurrency(0)}</span>
            </li>

            <hr className='border-gray-300' />
            <li className='flex flex-wrap gap-4 text-sm font-bold'>
              Total <span className='ml-auto'>{InrCurrency(0)}</span>
            </li>
          </ul>

          <div className='mt-8 space-y-2'>
            <button
              type='button'
              className='text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md cursor-not-allowed opacity-50 transition-all'
            >
              Checkout
            </button>
            <Link to='/products'>
              <button
                type='button'
                className='text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md mt-2'
              >
                Continue Shopping
              </button>
            </Link>
            <button
              type='button'
              className='text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-red-500 hover:bg-red-700 text-white rounded-md cursor-not-allowed opacity-50 transition-all'
            >
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyCart
