import Company from "../models/company.model.js";
import { handleError } from "../utils/error.js";

export const registerCompany = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and Description is required", success: false });
    }

    const company = await Company.findOne({ name });
    if (company) {
      return res
        .status(400)
        .json({ message: "Company already exists !", success: false });
    }

    const newCompany = new Company({
      name,
      description,
    });

    await newCompany.save();

    return res.status(201).json({
      message: "New company is created !",
      newCompany,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
