import express from "express";
import {
  addToCart,
  clearCart,
  getCartItemTotal,
  getCartItems,
  removeItem,
  updateCartItemQuantity,
} from "../Controllers/cartController.js";

const router = express.Router();

router.route("/:userId").get(getCartItems).post(addToCart).delete(clearCart);
router.route("/:cartId").put(updateCartItemQuantity).delete(removeItem);
router.route("/:userId/total").get(getCartItemTotal);

export default router;
