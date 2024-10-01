import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// connect routes and app here
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import productRouter from "./routes/product.route.js";
import { ApiErrorHandler } from "./utills/ApiErrorHandler.js";
import { ApiResponseHandler } from "./utills/ApiResponseHandler.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);

app.get("/", (_, res) => {
  res.send("hello-world");
});

// app.use(async (err, req, res, next) => {
//   console.error("check", JSON.parse(err));

//   // Check if it's an instance of ApiErrorHandler
//   if (err instanceof ApiErrorHandler) {
//     return res
//       .status(err.statusCode)
//       .json(new ApiErrorHandler(err.statusCode, err.message));
//   }
//   return res.status(400).json(err);
// });

export default app;
