import express from "express";
import { protect, recruiter } from "../middlewares/protect.js";
import { createJob } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/create-job", protect, recruiter, createJob);
