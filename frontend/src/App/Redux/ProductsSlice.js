import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  products: [],
  error: null,
  selectedProduct: null,
  searchProduct: [],
};
// const url = "https://dummyjson.com/products";
// const options = "/?limit=100";

const apiUrl = 'http://localhost:5000/api/v1/products'

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await fetch(`${apiUrl}`);
    const products = await response.json();
    console.log(products.body);
    return products.body;
  }
);

export const getProductsById = createAsyncThunk(
  "products/getProductsById",
  async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      const product = await response.json();
      console.log(product);
      return product.body;
    } catch (error) {
      console.error(error);
    }
  }
);



const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProductsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(getProductsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
  },
});

export const selectAllProducts = (state) => state.products;
export const selectedProduct = (state) => state.products.selectedProduct;
export const ProductsReducer = ProductsSlice.reducer;
