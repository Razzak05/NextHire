import cloudinary from "../config/cloudinary.js";

const uploadConfigs = {
  profile: {
    folder: "/Home/NextHire/user-profiles",
    allowedFormats: ["png", "jpeg", "jpg", "webp"],
    maxSize: 5 * 1024 * 1024,
    resourceType: "image",
  },
  resume: {
    folder: "/Home/NextHire/resumes",
    allowedFormats: ["pdf"],
    maxSize: 5 * 1024 * 1024,
    resourceType: "raw",
  },
};

const uploadToCloudinary = async (file, type) => {
  try {
    //convert buffer to base64
    const base64Data = file.buffer.toString("base64");
    const dataURI = `data:${file.mimetype};base64,${base64Data}`;

    // upload to cloudinary
    if (type === "profile") {
      const result = await cloudinary.uploader.upload(
        dataURI,
        uploadConfigs.profile
      );
      return result;
    } else {
      const result = await cloudinary.uploader.upload(
        dataURI,
        uploadConfigs.resume
      );
      return result;
    }

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Cloudinary delete failed: ${error.message}`);
  }
};

export default { uploadToCloudinary, deleteFromCloudinary };
