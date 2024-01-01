import express from "express";

import { addProduct, getAllProducts, editProduct, deleteProduct } from "../controllers/productController.js"

const router = express.Router();

router.post("/add-product", addProduct);

router.get("/get-all-products", getAllProducts);

router.put("/edit-product/:productId", editProduct);

router.delete("/delete-product/:productId", deleteProduct)

export default router;