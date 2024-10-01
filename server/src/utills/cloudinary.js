import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // file system default comes with node js

// to catch dotenv secrets
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload files
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded successfully
    // console.log(`file has been uploaded successfully.`);
    fs.unlinkSync(localFilePath);
    // console.log(response);
    return response;
  } catch (error) {
    console.log("cloudinary error", error);
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file
    return null;
  }
};

const uploadToCloudinarWithBase64 = (fileUri, fileName) => {
  console.log("Uploading:", fileName);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        overwrite: true,
        resource_type: "auto",
        // public_id: fileName, // Set custom file name (public ID)
        folder: "ration/user-profile", // Sub-folder in Cloudinary
      })
      .then((result) => {
        console.log("file uploaded", result);

        resolve({ success: true, result });
      })
      .catch((error) => {
        console.log("Upload failed:", error);
        reject({ success: false, error });
      });
  });
};

export { uploadOnCloudinary, uploadToCloudinarWithBase64 };
