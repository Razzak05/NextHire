import express from "express";
import { protect } from "../middlewares/protect.js";
import {
  Login,
  Logout,
  Register,
  updateProfile,
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", upload.single("profilePic"), Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.put(
  "/update-profile",
  protect,
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateProfile
);

export default router;
