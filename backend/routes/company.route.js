import express from "express";
import { protect, recruiter } from "../middlewares/protect.js";
import {
  getCompanies,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", protect, recruiter, registerCompany);
router.get("/get-all-companies", protect, recruiter, getCompanies);
router.get("/:id", protect, recruiter, getCompanyById);
router.put(
  "/update/:id",
  protect,
  recruiter,
  upload.single("logo"),
  updateCompany
);

export default router;
