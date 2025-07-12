import express from "express";
import { protect } from "../middlewares/protect.js";
import {
  Login,
  Logout,
  me,
  Register,
  updateProfile,
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", upload.single("profilePic"), Register);
router.post("/login", Login);
router.post("/logout", protect, Logout);
router.get("/me", protect, me);
router.put("/update-profile", protect, updateProfile);

export default router;
