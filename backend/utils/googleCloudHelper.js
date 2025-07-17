import { Storage } from "@google-cloud/storage";
import streamifier from "streamifier";

const googleStorage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
});

const bucket = googleStorage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);

// Helper function to upload file to Google Cloud Storage
export const uploadToGCS = (file, folder) => {
  return new Promise((resolve, reject) => {
    const fileName = `${folder}/${Date.now()}-${file.originalname}`;
    const gcsFile = bucket.file(fileName);

    const stream = gcsFile.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
      resumable: false,
    });

    stream.on("error", (error) => {
      reject(error);
    });

    stream.on("finish", () => {
      gcsFile
        .makePublic()
        .then(() => {
          resolve({
            url: `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET_NAME}/${fileName}`,
            fileName: fileName,
            originalName: file.originalname,
          });
        })
        .catch(reject);
    });

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

export const deleteFromGCS = (fileName) => {
  return new Promise((resolve, reject) => {
    const file = bucket.file(fileName);

    file
      .delete()
      .then(() => {
        resolve({ message: "File deleted successfully" });
      })
      .catch((error) => {
        if (error.code === 404) {
          resolve({ message: "File not found, nothing to delete" });
        } else {
          reject(error);
        }
      });
  });
};
