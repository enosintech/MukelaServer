import express from "express";
import {
    registerController,
    loginController,
    updateUserController,
    verifyOTP
} from "../controllers/userController.js";

const router = express.Router();

router.post("/create-user", registerController);

router.post("/signin", loginController);

router.put("/update-user", updateUserController);

router.post("/verify-otp", verifyOTP);

export default router;