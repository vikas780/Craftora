import { toast } from 'react-toastify'
import { createSlice } from '@reduxjs/toolkit'

const defaultState = {
  CartItems: [],
  ProductQuantity: 1,
  CartTotal: 0,
  OrderTotal: 0,
  NumItemsCart: 0,
  isLoaded: false,
}

const CartSlice = createSlice({
  name: 'cart',
  initialState: defaultState,

  reducers: {
    clearCart: (state) => {
      localStorage.setItem('CraftoraCart', JSON.stringify(defaultState))
      return defaultState
    },
    addToCart: (state, action) => {
      const { sendProduct } = action.payload

      if (!sendProduct || !sendProduct._id) {
        console.error('Product or product.id is undefined')
        return
      }

      const isItemPresent = state.CartItems.find(
        (i) => i._id === sendProduct._id
      )

      if (!isItemPresent) {
        state.NumItemsCart += 1

        // This below calculation is done because when we see the e-commerce website there are few products that have very low price so for that products the minimum quantity is more than other products so i set 5 as the minimum quantity
        const initialQuantity = sendProduct.price < 2 ? 5 : 1
        const initialPrice = sendProduct.price * initialQuantity

        // below we need to push price because when product qantity changes we need it

        state.CartItems.push({
          ...sendProduct,
          ProductQuantity: initialQuantity,
          originalPrice: sendProduct.price,
          price: initialPrice,
        })

        toast.success(`${sendProduct.name} added to cart`)
      } else {
        toast.error('Item already added to cart')
        return
      }

      CartSlice.caseReducers.totalPrice(state) // Calculate the total price
      localStorage.setItem('CraftoraCart', JSON.stringify(state))
    },

    increase: (state, action) => {
      const incId = action.payload
      const item = state.CartItems.find((item) => item._id === incId)

      if (item) {
        item.ProductQuantity += 1
        item.price = item.originalPrice * item.ProductQuantity
        toast.success(`${item.name} quantity increased`)
        CartSlice.caseReducers.totalPrice(state)
        localStorage.setItem('CraftoraCart', JSON.stringify(state))
      } else {
        toast.error('Item not found in cart')
      }
    },

    decrease: (state, action) => {
      const decId = action.payload
      const singleItem = state.CartItems.find((item) => item._id === decId)

      if (singleItem) {
        if (singleItem.ProductQuantity === 5) {
          // for those products whose price is very low. I took 2rs as low price
          CartSlice.caseReducers.removeOnDecrease(state, { payload: decId })
          toast.error(` ${singleItem.name} Quantity can't be less than 5`)
        } else if (singleItem.ProductQuantity > 1) {
          singleItem.ProductQuantity -= 1
          singleItem.price -= singleItem.originalPrice // Reduce price on quantity decrease
          toast.success(`${singleItem.name} quantity decreased`)
          CartSlice.caseReducers.totalPrice(state)
          localStorage.setItem('CraftoraCart', JSON.stringify(state))
        } else {
          CartSlice.caseReducers.removeOnDecrease(state, { payload: decId })
          toast.error(`${singleItem.name} removed`)
        }
      } else {
        toast.error('Item not found in cart')
      }
    },
    removeProduct: (state, action) => {
      const removeId = action.payload

      // To display product title at remove time 1st we need to find the product then filter the product from other products

      const productToRemove = state.CartItems.find(
        (item) => item._id === removeId
      )
      if (productToRemove) {
        state.CartItems = state.CartItems.filter(
          (item) => item._id !== removeId
        )
        if (state.NumItemsCart > 1) {
          state.NumItemsCart -= 1
        } else {
          state.NumItemsCart = 0
        }

        toast.error(`${productToRemove.name} removed from cart`)
        CartSlice.caseReducers.totalPrice(state)

        localStorage.setItem('CraftoraCart', JSON.stringify(state))
      } else {
        toast.error('Product not found in cart')
      }
    },
    removeOnDecrease: (state, action) => {
      const removeId = action.payload
      state.CartItems = state.CartItems.filter((item) => item._id !== removeId)
      state.NumItemsCart -= 1

      localStorage.setItem('CraftoraCart', JSON.stringify(state))
    },

    totalPrice: (state) => {
      state.CartTotal = 0
      state.CartItems.forEach((item) => {
        state.CartTotal += item.price
      })
      localStorage.setItem('CraftoraCart', JSON.stringify(state))
    },
    // to access data from localStorage
    loadCartFromLocalStorage: (state) => {
      if (typeof window !== 'undefined') {
        const storedCart = JSON.parse(localStorage.getItem('CraftoraCart'))
        if (storedCart && storedCart.CartItems) {
          return { ...storedCart, isLoaded: true }
        }
      }
      return { ...state, isLoaded: true }
    },
  },
})

export const {
  clearCart,
  increase,
  decrease,
  addToCart,
  removeProduct,
  removeOnDecrease,
  loadCartFromLocalStorage,
} = CartSlice.actions
export default CartSlice.reducer
