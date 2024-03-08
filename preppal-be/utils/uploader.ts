const azure = require("@azure/storage-blob");
const BlobServiceClient = azure.BlobServiceClient;

require("dotenv");

const uploadImage = async (file, fileName) => {
    try {
        // Create the BlobServiceClient object with connection string
        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_CONNECTION_KEY);
        const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER);
        const blobClient = containerClient.getBlockBlobClient(fileName);

        const options = { blobHTTPHeaders: { blobContentType: file.mimetype } };

        // wait for upload
        await blobClient.upload(file.buffer, file.size, options);

        const imageUrl = blobClient.url;

        return imageUrl;
    }
    catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
};

module.exports.uploadImage = uploadImage;
