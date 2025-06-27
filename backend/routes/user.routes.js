import express from "express";
import protect from "../middlewares/protect";
import {
  Login,
  Logout,
  Register,
  updateProfile,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", protect, Logout);
router.post("/update-profile", protect, updateProfile);
