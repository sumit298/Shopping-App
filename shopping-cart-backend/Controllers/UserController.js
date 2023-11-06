import User from "../Models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Buffer } from "buffer";

const secretKey = "Lionelmessi@10";
const base64SecretKey = Buffer.from(secretKey).toString("base64");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, secretKey, {
    expiresIn: "1h",
    algorithm: "HS256",
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, secretKey, {
    expiresIn: "7d",
    algorithm: "HS256",
  });
};

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password, role } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
      role,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "New User registered successfully",
      body: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // const token = jwt.sign({ userId: user._id }, secretKey, {
    //   expiresIn: "1h",
    // });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const { firstName, lastName, username, role, _id } = user;

    res.status(200).json({
      success: true,
      message: "Login Successful",
      body: {
        email,
        firstName,
        lastName,
        username,
        role,
        _id,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res
      .status(500)
      .json({ sucess: false, message: "Login failed", error: error.message });
  }
};

export const refreshToken = (req, res, next) => {
  try {
    const refreshToken = req.cookie.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        error: "Missing refresh token",
      });
    }

    // verifying the refresh token
    jwt.verify(refreshToken, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          error: "Invalid or expired refresh token",
        });
      }

      const accessToken = generateRefreshToken(decoded.userId);
      res.cookie("accessToken", accessToken, accessTokenCookieOptions);
      res.cookie("logged_in", true, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      });
      res.status(200).json({ success: true, accessToken });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server error" });
  }
};

// another function to verify just for usecases
export const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: err });
      }
      req.userId = decoded.userId;
      next();
    });
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const userid = req.userId;
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      body: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user details",
      error: error.message,
    });
  }
};


// This method throws invalid signature error use verify function instead. 
// TODO: have to debug
export const authenticatedUser = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Missing token" });
    }

    console.log(token);

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid or expired token", err });
      }

      req.userId = decoded.userId;
      req.email = decoded.email;
      next();
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
