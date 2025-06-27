import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/company.route.js";

const app = express();

//middlewares
dotenv.config();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
connectDB();

//Routes
app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is Running on PORT: ${process.env.PORT}`);
});
