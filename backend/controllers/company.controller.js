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
      creator: req.user._id,
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

export const getCompanies = async (req, res) => {
  try {
    const userId = req.user._id;
    const companies = await Company.find({ creator: userId });
    if (!companies) {
      return res.status(404).json({
        message: "No companies found !",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company doesn't exists !",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, logo } = req.body;
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company does not exists!", success: false });
    }
    if (name) company.name = name;
    if (description) company.description = description;
    if (website) company.website = website;
    if (logo) company.logo = logo;

    return res.status(201).json({
      company,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
