import { configureStore } from "@reduxjs/toolkit";
import { ProductsReducer } from "./ProductsSlice";
// import { AuthReducer } from "./authSlice";
import { AuthenticationReducer } from "./AuthenticationSlice";
import { CartItemsReducer } from "./CartItemsSlice";

const Store = configureStore({
  reducer: {
    cart: CartItemsReducer,
    products: ProductsReducer,
    authentication: AuthenticationReducer,
  },
});

export default Store;
