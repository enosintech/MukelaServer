import express from "express";
import path from "path";
import multer from "multer";
import { businessOnboardController, fetchBusiness } from "../controllers/businessDataController.js";

const router = express.Router();

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb( new Error("Invalid file type!"), false);
    }
};

const absolutePath = path.join(process.cwd(), "path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, absolutePath);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
})

const upload = multer({storage, fileFilter});

router.post("/business-onboard", upload.single("file"), businessOnboardController);

router.get("/fetch-business", fetchBusiness );

export default router;