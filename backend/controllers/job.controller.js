import express from "express";
import Job from "../models/job.model.js";
import { handleError } from "../utils/error";

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
      experienceLevel,
      company,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !experienceLevel ||
      !company
    ) {
      return res.status(400).json({
        message: "All the fields are required !",
        success: true,
      });
    }

    const job = new Job({
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      experienceLevel,
      company,
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
