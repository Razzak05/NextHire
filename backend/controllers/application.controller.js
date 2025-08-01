import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import { handleError } from "../utils/error.js";

// Apply to a job
export const applyJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "Job not found!",
        success: false,
      });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      applicant: userId, // Use userId directly
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied!",
        success: false,
      });
    }

    // Create new application with user ID
    const newApplication = new Application({
      job: jobId,
      applicant: userId, // Store user ID, not full object
    });

    await newApplication.save();

    // Push application ID to job
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(200).json({
      message: "Applied to job successfully!",
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// Get all jobs a user has applied to
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user._id;

    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      });

    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// Get all applicants for a specific job
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user._id;

    const job = await Job.findOne({ _id: jobId, createdBy: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "applications",
        populate: {
          path: "applicant",
          select: "-password",
        },
      });

    if (!job) {
      return res.status(404).json({
        message: "Job not found!",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// Update application status
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: "Application not found!",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully!",
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
