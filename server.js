// import dependencies
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import connectDB from "./config/db.js";

import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import bizDataRoute from "./routes/bizDataRoute.js";
import businessAccountRoute from "./routes/businessAccountRoute.js";
import productRoute from "./routes/productRoute.js";
import transactionRoute from "./routes/transactionRoute.js";
import orderRoute from "./routes/orderRoute.js";

// configure dotenv
dotenv.config();

// connect to database
connectDB();

// set up server application
const app = express();
const PORT = 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/auth", userRoute);
app.use("/post", postRoute);
app.use("/biz", bizDataRoute);
app.use("/business-auth", businessAccountRoute);
app.use("/prod", productRoute);
app.use("/trans", transactionRoute);
app.use("/orders", orderRoute);

// run server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})



