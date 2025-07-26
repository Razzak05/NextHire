import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import path from "path";

const uploadConfigs = {
  profile: {
    folder: "NextHire/user-profiles",
    allowedFormats: ["png", "jpeg", "jpg", "webp"],
    maxSize: 5 * 1024 * 1024,
    resource_type: "image",
  },
  resume: {
    folder: "NextHire/resumes",
    allowedFormats: ["pdf"],
    maxSize: 5 * 1024 * 1024,
    resource_type: "auto",
  },
  logo: {
    folder: "Nexthire/logos",
    allowedFormats: ["png", "jpeg", "jpg", "webp"],
    maxSize: 5 * 1024 * 1024,
    resource_type: "image",
  },
};

const uploadToCloudinary = async (file, type) => {
  const config = uploadConfigs[type];
  if (!config) throw new Error(`Invalid upload type: ${type}`);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        ...config,
        public_id: path.parse(file.originalname).name,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
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
