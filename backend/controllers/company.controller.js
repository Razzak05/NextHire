import Company from "../models/company.model.js";
import cloudinaryHelper from "../utils/cloudinaryHelper.js";
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
    const id = req.params.id;
    const updates = req.body;
    const logo = req.file; // Using single file upload
    const userId = req.user._id; // Assuming you have user in request

    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({
        message: "Company does not exist!",
        success: false,
      });
    }

    // Verify user owns the company (important security check)
    if (company.creator.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Unauthorized to update this company",
        success: false,
      });
    }

    // Update basic fields
    if (updates.name) company.name = updates.name;
    if (updates.description) company.description = updates.description;
    if (updates.website) company.website = updates.website;
    if (updates.location) company.location = updates.location;

    // Handle logo upload
    if (logo) {
      try {
        const uploadedLogo = await cloudinaryHelper.uploadToCloudinary(
          logo,
          "logo"
        );

        // Verify upload was successful
        if (!uploadedLogo.url || !uploadedLogo.public_id) {
          throw new Error(
            "Cloudinary upload failed - missing URL or public_id"
          );
        }

        // Delete old logo if exists
        if (company.logo?.public_id) {
          await cloudinaryHelper.deleteFromCloudinary(company.logo.public_id);
        }

        company.logo = {
          url: uploadedLogo.url,
          public_id: uploadedLogo.public_id,
        };
      } catch (uploadError) {
        console.error("Logo upload error:", uploadError);
        return res.status(500).json({
          message: "Failed to upload company logo",
          success: false,
          error: uploadError.message,
        });
      }
    }

    // Save and respond
    await company.save();

    return res.status(200).json({
      company,
      success: true,
      message: "Company updated successfully",
    });
  } catch (error) {
    console.error("Update company error:", error);
    handleError(error, res);
  }
};
