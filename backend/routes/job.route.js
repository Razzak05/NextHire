import express from "express";
import { protect, recruiter } from "../middlewares/protect.js";
import {
  createJob,
  getAdminJobs,
  getAllJobs,
  getJobById,
} from "../controllers/job.controller.js";

const router = express.Router();

router.post("/create-job", protect, recruiter, createJob);
router.get("/get-all-jobs", protect, getAllJobs);
router.get("/my-jobs", protect, recruiter, getAdminJobs);
router.get("/:id", protect, getJobById);

export default router;
