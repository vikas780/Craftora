import React from 'react'

const CartLading = () => {
  return (
    <div className='font-sans max-w-7xl max-md:max-w-xl mx-auto p-4 '>
      <h1 className='text-2xl font-extrabold text-gray-800'>Your Cart</h1>

      <div className='grid md:grid-cols-3 gap-4 mt-8 animate-pulse'>
        <div className='md:col-span-2 space-y-4'>
          {/* Card 1 */}
          <div className='flex gap-4 bg-white px-4 py-6 rounded-md shadow-sm'>
            <div className='w-28 h-28 max-sm:w-24 max-sm:h-24 bg-gray-200 rounded-md'></div>
            <div className='flex flex-col gap-4 w-full'>
              <div className='h-4 bg-gray-200 rounded-md w-2/3'></div>
              <div className='h-4 bg-gray-200 rounded-md w-1/3'></div>
              <div className='mt-auto flex items-center gap-3'>
                <div className='w-5 h-5 bg-gray-200 rounded-full'></div>
                <div className='h-4 bg-gray-200 rounded-md w-8'></div>
                <div className='w-5 h-5 bg-gray-200 rounded-full'></div>
              </div>
            </div>
            <div className='ml-auto flex flex-col'>
              <div className='h-4 bg-gray-200 rounded-md w-4'></div>
              <div className='h-6 bg-gray-200 rounded-md w-16 mt-auto'></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className='flex gap-4 bg-white px-4 py-6 rounded-md shadow-sm'>
            <div className='w-28 h-28 max-sm:w-24 max-sm:h-24 bg-gray-200 rounded-md'></div>
            <div className='flex flex-col gap-4 w-full'>
              <div className='h-4 bg-gray-200 rounded-md w-2/3'></div>
              <div className='h-4 bg-gray-200 rounded-md w-1/3'></div>
              <div className='mt-auto flex items-center gap-3'>
                <div className='w-5 h-5 bg-gray-200 rounded-full'></div>
                <div className='h-4 bg-gray-200 rounded-md w-8'></div>
                <div className='w-5 h-5 bg-gray-200 rounded-full'></div>
              </div>
            </div>
            <div className='ml-auto flex flex-col'>
              <div className='h-4 bg-gray-200 rounded-md w-4'></div>
              <div className='h-6 bg-gray-200 rounded-md w-16 mt-auto'></div>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-md px-4 py-6 h-max shadow-sm animate-pulse'>
          <ul className='space-y-4'>
            <li className='flex flex-wrap gap-4 text-sm'>
              <div className='h-4 bg-gray-200 rounded-md w-1/2'></div>
              <div className='h-4 bg-gray-200 rounded-md w-1/4 ml-auto'></div>
            </li>
            <li className='flex flex-wrap gap-4 text-sm'>
              <div className='h-4 bg-gray-200 rounded-md w-1/2'></div>
              <div className='h-4 bg-gray-200 rounded-md w-1/4 ml-auto'></div>
            </li>
            <li className='flex flex-wrap gap-4 text-sm'>
              <div className='h-4 bg-gray-200 rounded-md w-1/2'></div>
              <div className='h-4 bg-gray-200 rounded-md w-1/4 ml-auto'></div>
            </li>
            <hr className='border-gray-300' />
            <li className='flex flex-wrap gap-4 text-sm font-bold'>
              <div className='h-4 bg-gray-200 rounded-md w-1/2'></div>
              <div className='h-4 bg-gray-200 rounded-md w-1/4 ml-auto'></div>
            </li>
          </ul>

          <div className='mt-8 space-y-2'>
            <div className='h-10 bg-gray-200 rounded-md'></div>
            <div className='h-10 bg-gray-200 rounded-md'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartLading
