import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmptyCart from '../components/EmptyCart'
import { clearCart, loadCartFromLocalStorage } from '../features/Cart/CartSlice'
import CartItemList from '../components/CartItems'
import { InrCurrency } from '../components/InrCurrency'
import CartLading from '../components/CartShimmerUI'

const Cart = () => {
  // Fetching defaultState variables from CartSlice
  const { CartItems, isLoaded, CartTotal } = useSelector((state) => state.Cart)

  // Calculate 10% discount on the total cart amount

  const discount = CartTotal * 0.1
  const totalAfterDiscount = CartTotal - discount

  // Determine shipping charges based on the number of items
  const shippingCharges = CartItems.length < 3 ? 50 : 0
  const totalWithShipping = totalAfterDiscount + shippingCharges

  // Fixed discount of 50rs
  const fixedDiscount = CartTotal > 100 ? 50 : 0
  const finalOrderprice = totalWithShipping - fixedDiscount

  const dispatch = useDispatch()

  // To prevent hyderation cause due to data present in local storage
  useEffect(() => {
    dispatch(loadCartFromLocalStorage())
  }, [dispatch])

  if (CartItems.length === 0) {
    return <EmptyCart />
  }
  if (!isLoaded) {
    return <CartLading />
  }

  return (
    <div className='font-sans max-w-[1350px] max-md:max-w-[45rem] mx-auto p-4'>
      <h1 className='text-2xl font-extrabold text-gray-800'>Your Cart</h1>
      <div className='grid md:grid-cols-3 gap-4 mt-8'>
        <div className='md:col-span-2 space-y-4'>
          {CartItems.map((item) => (
            <CartItemList key={item._id} {...item} />
          ))}
          {/* Testing cart
          
          <CartItemList
            id={'2'}
            title={'iphone'}
            price={'12000'}
            thumbnail={''}
            brand={'Apple'}
          /> */}
        </div>

        <div className='bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]'>
          <ul className='text-gray-800 space-y-4'>
            <li className='flex flex-wrap gap-4 text-sm '>
              Subtotal{' '}
              <span className='ml-auto font-bold text-green-600'>
                +{InrCurrency(CartTotal)}
              </span>
            </li>

            <li className='flex flex-wrap gap-4 text-sm'>
              Shipping Charges
              <span className='ml-auto font-bold text-green-600'>
                {shippingCharges === 50 ? (
                  <p>+{InrCurrency(shippingCharges)}</p>
                ) : (
                  <p>Free</p>
                )}
              </span>
            </li>
            <li className='flex flex-wrap gap-4 text-sm'>
              Discount (10%)
              <span className='ml-auto font-bold text-red-500'>
                -{InrCurrency(discount)}
              </span>
            </li>
            <li className='flex flex-wrap gap-4 text-sm'>
              Fixed Discount
              <span className='ml-auto font-bold text-red-500'>
                {fixedDiscount === 50 ? (
                  <p>-{InrCurrency(fixedDiscount)}</p>
                ) : (
                  <p>For Discount total must be over {InrCurrency(100)}</p>
                )}
              </span>
            </li>

            <hr className='border-gray-300' />
            <li className='flex flex-wrap gap-4 text-sm font-bold'>
              Total{' '}
              <span className='ml-auto'>{InrCurrency(finalOrderprice)}</span>
            </li>
          </ul>

          <div className='mt-8 space-y-2'>
            <button
              type='button'
              className='text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md'
            >
              Checkout
            </button>
            <div className='py-2.5'>
              <Link to='/products'>
                <button
                  type='button'
                  className='text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md'
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
            <button
              type='button'
              className='text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-red-500 hover:bg-red-700 text-white rounded-md'
              onClick={() => dispatch(clearCart())}
            >
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
