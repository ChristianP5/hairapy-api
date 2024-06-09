const { Storage } = require("@google-cloud/storage");

// Making a Google Cloud Storage Client

    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
    })

const createBucket = async () => {
    const bucket = storage.bucket(process.env.ARTICLES_BUCKET_NAME);

    try{
        // Check if Bucket Exists
        const [metadata] = await bucket.getMetadata();
    }catch(error){
        // Bucket Doesn't Exists, so Create Bucket
        const createBucketOptions = {
            location: 'ASIA-SOUTHEAST2',
        }

        await storage.createBucket(process.env.ARTICLES_BUCKET_NAME, createBucketOptions);
    }
}


// Function to upload an image to Google Cloud Storage
async function uploadImage(filePath, destinationPath) {
    try {
            const bucket = storage.bucket(process.env.ARTICLES_BUCKET_NAME);

        // Set custom metadata for the uploaded image
        const customMetadata = {
            contentType: 'image/jpeg', 
            metadata: {
                type: "articles-image" 
            }
        };

            const optionsUploadObject = {
                destination: destinationPath,
                metadata: customMetadata
            };

        // Upload the image to the bucket
        await bucket.upload(filePath, optionsUploadObject);
        // console.log(`${filePath} uploaded to ${process.env.ARTICLES_BUCKET_NAME} bucket`);
        return true;
    } catch (error) {
        // console.error(`Failed to upload ${filePath}:`, error);
        throw error;
    }
}

async function removeImage(filePath) {
    try {
            const bucket = storage.bucket(process.env.ARTICLES_BUCKET_NAME);

        // Upload the image to the bucket
        await bucket.file(filePath).delete();
        console.log(`${filePath} deleted from ${process.env.ARTICLES_BUCKET_NAME} bucket`);
        return true;
    } catch (error) {
        console.error(`Failed to upload ${filePath}:`, error);
        throw error;
    }
}

module.exports = { uploadImage, removeImage, createBucket };