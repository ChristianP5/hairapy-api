const { Storage } = require("@google-cloud/storage");

// Making a Google Cloud Storage Client

    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
    })

const createBucket = async () => {
    const bucket = storage.bucket(process.env.BUCKET_NAME);

    try{
        // Check if Bucket Exists
        const [metadata] = await bucket.getMetadata();
    }catch(error){
        // Bucket Doesn't Exists, so Create Bucket
        const createBucketOptions = {
            location: 'ASIA-SOUTHEAST2',
        }

        await storage.createBucket(process.env.BUCKET_NAME, createBucketOptions);
    }
}


// Function to upload an image to Google Cloud Storage
async function uploadImage(filePath, destinationPath) {
    try {
            const bucket = storage.bucket(process.env.BUCKET_NAME);

        // Set custom metadata for the uploaded image
        const customMetadata = {
            contentType: 'image/jpeg', 
            metadata: {
                type: "api-upload" 
            }
        };

            const optionsUploadObject = {
                destination: destinationPath,
                metadata: customMetadata
            };

        // Upload the image to the bucket
        const response = await bucket.upload(filePath, optionsUploadObject);
        console.log(`${filePath} uploaded to ${process.env.BUCKET_NAME} bucket`);
        return response;
    } catch (error) {
        console.error(`Failed to upload ${filePath}:`, error);
        throw error;
    }
}

module.exports = { uploadImage, createBucket };