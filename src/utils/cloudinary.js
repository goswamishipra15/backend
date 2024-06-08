import { v2 as cloudinary } from "cloudinary"
import fs from "fs"



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}


const deleteFromCloudinary = async (url) => {
    try {
        // Extract the publicId from the URL
        const publicId = url.split('/').slice(-2).join('/').split('.')[0];
        // Delete the file from Cloudinary
        await cloudinary.uploader.destroy(publicId);
        console.log(`Successfully deleted image with public ID: ${publicId}`);
    } catch (error) {
        console.error(`Error deleting image from Cloudinary: ${error.message}`);
        throw new Error(`Error deleting image from Cloudinary: ${error.message}`);
    }
}



export { uploadOnCloudinary, deleteFromCloudinary }