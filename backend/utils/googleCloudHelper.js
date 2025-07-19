import { Storage } from "@google-cloud/storage";
import streamifier from "streamifier";

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);

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

export const deleteFromGCS = async (fileName) => {
  const file = bucket.file(fileName);
  try {
    await file.delete();
    return { message: "File deleted successfully" };
  } catch (err) {
    if (err.code === 404) {
      return { message: "File not found, nothing to delete" };
    }
    throw err;
  }
};
