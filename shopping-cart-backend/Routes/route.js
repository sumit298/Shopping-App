import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../Controllers/controllers.js";
import { authenticatedUser } from "../Controllers/UserController.js";

const router = Router();

router.route("/").get(getAllProducts).post(authenticatedUser, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(authenticatedUser, deleteProduct)
  .put(authenticatedUser, updateProduct);

export default router;
