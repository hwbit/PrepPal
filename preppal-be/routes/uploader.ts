const azure = require("@azure/storage-blob");
const BlobServiceClient = azure.BlobServiceClient;

require("dotenv").config();

const Uploader = async (file, fileName) => {
    try {
        const fileBuffer = file.buffer;
        const imageType = file.mimetype;

        // Create the BlobServiceClient object with connection string
        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_CONNECTION_KEY);
        const containerClient = blobServiceClient.getContainerClient("upload");
        const blobClient = containerClient.getBlockBlobClient(fileName);

        const options = { blobHTTPHeaders: { blobContentType: imageType } };

        // wait for upload
        await blobClient.upload(fileBuffer, fileBuffer.length, options);

        const imageUrl = blobClient.url;

        return imageUrl;
    }
    catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
};

module.exports = Uploader;
