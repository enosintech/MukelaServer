import express from "express";

import { 
    addTransaction, 
    getAllTransactions
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/add", addTransaction);

router.get("/all", getAllTransactions);

export default router;