import Cart from "../Models/CartSchema.js";
import User from "../Models/userSchema.js";
import Product from "../Models/productSchema.js";

export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const cartItems = await Cart.find({ user: userId }).populate("product");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { userId, productIds } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartItems = [];

    for (const productId of productIds) {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const productQuantity = product.quantity;

      let cartItem;

      if (productQuantity > 1) {
        cartItem = new Cart({
          user: userId,
          product: productId,
          quantity: productQuantity,
        });
        product.quantity += 1;
      } else {
        cartItem = new Cart({
          user: userId,
          product: productId,
          quantity: 1,
        });
      }

      cartItems.push(cartItem);

      await cartItem.save();
      await product.save();
    }

    res.status(201).json({
      success: true,
      message: "Product added to the cart",
      cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const updateCartItemQuantity = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findById(cartItemId);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart Item not found",
      });
    }
    console.log(cartItem);
    cartItem.product.quantity = quantity;

    await cartItem.save();

    res.status(200).json({
      sucess: true,
      message: "Cart Item quantity updated",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

export const removeItem = async (req, res) => {
  try {
    const { userId, cartItemId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartItem = await Cart.findById(cartItemId);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart Item not found",
      });
    }

    const cartQuantity = cartItem.product.quantity;

    if (cartQuantity === 1) {
      user.cart.productIds = user.cart.productIds.filter(
        (productId) => productId.toString() !== cartItem.product.toString()
      );
    } else {
      cartItem.product.quantity -= 1;
    }

    await user.save();
    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Cart Item removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    await Cart.deleteMany({ user: userId });

    res.status(200).json({
      success: true,
      message: "Cart Cleared",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      error,
    });
  }
};

export const getCartItemTotal = async (req, res) => {
  const userId = req.params.userId;
  try {
    const cartItems = await Cart.find({ userId });
    let total = 0;
    for (const item of cartItems) {
      total += item.quantity * item.price;
    }
    res.json({ total });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to calculate cart total",
      error,
    });
  }
};
