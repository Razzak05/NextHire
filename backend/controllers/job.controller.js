import Job from "../models/job.model.js";
import { handleError } from "../utils/error.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      experience,
      companyId,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !experience ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All the fields are required !",
        success: true,
      });
    }

    const job = new Job({
      title,
      description,
      requirements: requirements?.split(","),
      salary: Number(salary),
      location,
      jobType,
      position,
      experienceLevel: experience,
      company: companyId,
      createdBy: req.user._id,
    });

    await job.save();

    return res.status(201).json({
      message: "New Job Created Successfully !",
      job,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const searchKeyword = req?.query?.keyword || "";
    const query = {
      $or: [
        { title: { $regex: searchKeyword, $options: "i" } },
        { description: { $regex: searchKeyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found !",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found",
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

export const getAdminJobs = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobs = await Job.find({ createdBy: userId }).populate("company");

    if (!jobs) {
      return res.status(404).json({
        message: "No job exists!",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
