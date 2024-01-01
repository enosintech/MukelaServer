import express from "express";
import { 
    registerController, 
    loginController, 
    verifyOTP
} from "../controllers/businessAccountController.js";

const router  = express.Router();

router.post("/create-business-user", registerController);

router.post("/sign-in-business", loginController);

router.post("/verify-otp", verifyOTP)

export default router;