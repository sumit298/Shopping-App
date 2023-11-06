import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const loadCartItems = createAsyncThunk(
  "cart/loadCartItems",
  async () => {
    try {
      const cartItems = localStorage.getItem("cartItems");
      const result = await JSON.parse(cartItems);
      // console.log(result)
      return result;
    } catch (error) {
      console.error(error);
    }
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isInCart = state?.cartItems?.find(
        (cartItem) => cartItem._id === item._id
      );

      if (isInCart) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        state.cartItems = [
          ...(state.cartItems || []),
          { ...item, quantity: 1 },
        ];
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      const isinCart = state.cartItems.find(
        (cartItem) => cartItem._id === item._id
      );

      if (isinCart.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem._id !== item._id
        );
      } else {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(loadCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartTotal = createSelector(selectCartItems, (cartItems) => {
  if (!cartItems || cartItems?.length === 0) {
    return 0;
  }

  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});

export const { addToCart, removeFromCart, clearCart } = CartSlice.actions;

export const CartReducer = CartSlice.reducer;
