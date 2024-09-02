import { configureStore } from '@reduxjs/toolkit'
import UserAuthReducer from './features/Authentication/UserAuth'
import CartSlice from './features/Cart/CartSlice'
export const Store = configureStore({
  reducer: {
    UserAuth: UserAuthReducer,
    Cart: CartSlice,
  },
})
