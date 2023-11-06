import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/api/v1/cart";

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (userId) => {
    const result = await axios(`${url}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.data;
  }
);

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const productAddToCart = createAsyncThunk(
  "cart/postCartItems",
  async (userId, item) => {
    const result = await axios(`${url}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: item,
    });
    return result.data;
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async (userId) => {
  const result = await axios.delete(`${url}/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result.data;
});

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ cartItemId, quantity }) => {
    const result = await axios(`${url}/${cartItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: quantity,
    });
    return result.data;
  }
);


export const getCartItemTotal = createAsyncThunk(
  'cart/getCartItemTotal',
  async (userId) => {
    const result = await axios(`${url}/${userId}/total`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return result.data
  }
)



export const removeFromCartByQuantity = createAsyncThunk(
  "cart/removeItemFromCart",
  async (cartItemId) => {
    const result = await axios.delete(`${url}/${cartItemId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.data;
  }
);

const CartItemsSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(productAddToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productAddToCart.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(productAddToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeFromCartByQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCartByQuantity.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(removeFromCartByQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCartItemTotal.pending, (state)=> {
        state.loading = true;
        state.error = action.error.message
      })
      .addCase(getCartItemTotal.fulfilled, (state)=> {
        state.loading = false
      })
      .addCase(getCartItemTotal.rejected, (state, action)=> {
        state.loading = false;
        state.error = null
      })
  },
});


export const CartItemsReducer = CartItemsSlice.reducer;
