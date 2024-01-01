import express from "express";

import {
    createPostController,
    getAllPostsContoller,
    getUserPostsController,
    deletePostController,
    updatePostController
} from "../controllers/postController.js";

const router = express.Router();

router.post("/create-post", createPostController);

router.get("/get-all-post", getAllPostsContoller);

router.get("/get-user-post", getUserPostsController);

router.delete("/delete-post/:id", deletePostController);

router.put("/update-post/:id", updatePostController);

export default router;