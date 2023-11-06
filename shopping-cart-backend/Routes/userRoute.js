import express from "express";
import {
  getProfile,
  login,
  register,
} from "../Controllers/UserController.js";
import { verify } from "../Controllers/UserController.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/profile").get(verify, getProfile);

export default router;
