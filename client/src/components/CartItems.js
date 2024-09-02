import { FaCirclePlus, FaCircleMinus } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { removeProduct, increase, decrease } from '../features/Cart/CartSlice'
import { InrCurrency } from './InrCurrency'

const CartItemList = ({ _id, name, price, image }) => {
  const { CartItems } = useSelector((state) => state.Cart)
  const item = CartItems.find((item) => item._id === _id)
  const dispatch = useDispatch()

  return (
    <div className='flex gap-4 bg-white px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]'>
      <div className='flex gap-4'>
        <div className='w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0'>
          <div className='relative w-full h-full'>
            <img
              src={image}
              alt={name}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div>
            <h3 className='text-base  font-bold text-gray-800 '>{name}</h3>
          </div>

          <div className='mt-auto flex items-center gap-3'>
            <button
              onClick={() => dispatch(removeProduct(_id))}
              className=' text-sm  font-semibold  px-3 py-2 rounded-md text-white bg-red-500 hover:bg-red-700 transition-all '
            >
              Remove Item
            </button>
          </div>
        </div>
      </div>

      <div className='ml-auto flex flex-col'>
        <div className='flex items-start gap-4 justify-end'>
          <h3 className='text-base font-bold text-gray-800 mt-auto'>
            {InrCurrency(price)}
          </h3>
        </div>
        <div className='mt-auto flex items-center mb-2 gap-1 '>
          <button
            onClick={() => {
              dispatch(decrease(_id))
            }}
            type='button'
            className='flex items-center justify-center w-5 h-5 outline-none rounded-full'
          >
            <FaCircleMinus
              className='text-gray-400 hover:text-gray-800 transition-colors duration-300'
              size={32}
            />
          </button>
          <span className='font-bold text-sm leading-[18px]'>
            {item ? item.ProductQuantity : 1}
          </span>
          <button
            onClick={() => {
              dispatch(increase(_id))
            }}
            type='button'
            className='flex items-center justify-center w-5 h-5  outline-none rounded-full'
          >
            <FaCirclePlus
              className='text-gray-400 hover:text-gray-800 transition-colors duration-300'
              size={32}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItemList
