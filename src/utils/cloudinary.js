import { v2 as cloudinary } from 'cloudinary';
import { fs } from 'fs';
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadonCloudinary = async (localFilePath) => {
    try {
        // if localFilePath is not available so we have to return null at that time.
        if (!localFilePath) return null;

        // To upload the file on the cloudinary.

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });
        console.log("File Uploaded!!", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // To remove the file from locally as it might have error and might take malicious data.
        return null;
    }
}
export { uploadonCloudinary };
