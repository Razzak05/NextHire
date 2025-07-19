import { Storage } from "@google-cloud/storage";
import streamifier from "streamifier";

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS),
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);

// Upload file to Google Cloud Storage
export const uploadToGCS = async (file, folder) => {
  const fileName = `${folder}/${Date.now()}-${file.originalname}`;
  const gcsFile = bucket.file(fileName);

  return new Promise((resolve, reject) => {
    const stream = gcsFile.createWriteStream({
      metadata: { contentType: file.mimetype },
      resumable: false,
    });

    stream.on("error", reject);

    stream.on("finish", async () => {
      try {
        await gcsFile.makePublic();
        resolve({
          url: `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET_NAME}/${fileName}`,
          fileName,
          originalName: file.originalname,
        });
      } catch (err) {
        reject(err);
      }
    });

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

// Delete file from Google Cloud Storage
export const deleteFromGCS = async (fileName) => {
  const file = bucket.file(fileName);
  try {
    await file.delete();
    return { message: "File deleted successfully" };
  } catch (error) {
    if (error.code === 404) {
      return { message: "File not found, nothing to delete" };
    }
    throw error;
  }
};
