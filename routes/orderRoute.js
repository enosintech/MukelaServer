import express from "express";

import {
    makeOrder,
    getOrders
} from "../controllers/orderController.js"

const router = express.Router();

router.post("/make-orders", makeOrder);

router.get("/get-orders", getOrders);

export default router;