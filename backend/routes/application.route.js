import express from "express";
import { protect, recruiter } from "../middlewares/protect.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

router.post("/apply-job/:id", protect, applyJob);
router.get("/get-applied-jobs", protect, getAppliedJobs);
router.get("/get-applicants/:id", protect, recruiter, getApplicants);
router.put("/status/:id/update", protect, recruiter, updateStatus);

export default router;
