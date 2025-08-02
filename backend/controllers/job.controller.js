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
      vacancies,
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
      !companyId ||
      !vacancies
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
      vacancies: Number(vacancies),
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
    const {
      search = "",
      location = "",
      industry = "",
      salary = "",
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = -1,
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const sortObj = {};
    sortObj[sortBy] = Number(sortOrder);

    // Build salary filter
    const salaryRanges = {
      "0-40K": { min: 0, max: 40000 },
      "41K-1 Lakh": { min: 41000, max: 100000 },
      "1 Lakh - 5 Lakh": { min: 100000, max: 500000 },
    };

    // Create match stage
    const matchStage = {
      $match: {},
    };

    // Add search condition
    if (search) {
      matchStage.$match.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { jobType: { $regex: search, $options: "i" } },
        // Fixed skills search - uses $elemMatch
        { skills: { $elemMatch: { $regex: search, $options: "i" } } },
        { "companyDetails.name": { $regex: search, $options: "i" } },
      ];
    }

    // Add other filters
    if (location) {
      matchStage.$match.location = { $regex: location, $options: "i" };
    }
    if (industry) {
      matchStage.$match.industry = { $regex: industry, $options: "i" };
    }
    if (salary && salaryRanges[salary]) {
      matchStage.$match.salary = {
        $gte: salaryRanges[salary].min,
        $lte: salaryRanges[salary].max,
      };
    }

    const pipeline = [
      {
        $lookup: {
          from: "companies",
          localField: "company",
          foreignField: "_id",
          as: "companyDetails",
        },
      },
      { $unwind: "$companyDetails" },
      matchStage, // Add the match stage here
      { $sort: sortObj },
      { $skip: skip },
      { $limit: Number(limit) },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          salary: 1,
          jobType: 1,
          location: 1,
          industry: 1,
          createdAt: 1,
          skills: 1,
          company: "$companyDetails", // return full company info
        },
      },
    ];

    // Count pipeline without pagination stages
    const countPipeline = [
      {
        $lookup: {
          from: "companies",
          localField: "company",
          foreignField: "_id",
          as: "companyDetails",
        },
      },
      { $unwind: "$companyDetails" },
      matchStage, // Same match conditions
      { $count: "total" },
    ];

    const [jobs, totalCountResult] = await Promise.all([
      Job.aggregate(pipeline),
      Job.aggregate(countPipeline),
    ]);

    const totalCount = totalCountResult[0]?.total || 0;

    res.status(200).json({
      jobs,
      totalCount,
      page: Number(page),
      totalPages: Math.ceil(totalCount / Number(limit)),
    });
  } catch (error) {
    console.error("Job fetch error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      populate: {
        path: "applicant",
      },
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
