import Product from "../Models/productSchema.js";
import { asyncHandler } from "../MiddleWares/async.js";

// @desc GET ALL Products
// @route GET /api/v1/products
// access Public
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      count: products.length,
      body: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

// @desc Create a product
// @route POST /api/v1/products
// access Public
export const createProduct = async (req, res, next) => {
  const bootcamp = await Product.create(req.body);
  res.status(201).json({
    success: true,
    body: bootcamp,
  });
};

// @desc Get Product by id
// @route GET /api/v1/products/:id
// access Public

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    res.status(201).json({
        success: true,
        body: product
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc Update Products
// @route PUT api/v1/products/:id
// access Private

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc Delete Bootcamp
// @route DELETE /api/v1/bootcamps/:id
// access Private

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Server error",
    });
  }
};
