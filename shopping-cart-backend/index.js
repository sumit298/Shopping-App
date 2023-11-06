import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import productRouter from "./Routes/route.js";
import userRouter from "./Routes/userRoute.js";
import cartRouter from "./Routes/cartRoute.js";
import morgan from "morgan";
import connectDB from "./db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
connectDB();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);

const port = 5000;
app.listen(port, () => console.log(`Server up and runnning on ${port}`));
