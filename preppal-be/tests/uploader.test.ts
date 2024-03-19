const { BlobServiceClient, ContainerClient, BlockBlobClient } = require("@azure/storage-blob");
const uploadImage = require("../utils/uploader");

jest.mock("@azure/storage-blob", () => ({
    BlobServiceClient: {fromConnectionString: jest.fn()},
    ContainerClient: jest.fn(),
    BlockBlobClient: jest.fn(),
}));

describe("uploadImage function", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should upload image successfully", async () => {
        // Mock Azure storage objects
        const mockBlobServiceClient = {
            getContainerClient: jest.fn().mockReturnValue({
                getBlockBlobClient: jest.fn().mockReturnValue({
                    upload: jest.fn(),
                    url: "https://preppal.blob.core.windows.net/uploads/filename.jpg",
                }),
            }),
        };
        BlobServiceClient.fromConnectionString.mockReturnValue(mockBlobServiceClient);

        // Mock file data
        const file = {
            originalname: "example.jpg",
            mimetype: "image/jpeg",
            buffer: Buffer.from("image content"),
            size: 12345,
        };

        const fileName = "filename";

        const imageUrl = await uploadImage.uploadImage(file, fileName);

        expect(imageUrl).toEqual("https://preppal.blob.core.windows.net/uploads/filename.jpg");
        expect(BlobServiceClient.fromConnectionString).toHaveBeenCalledWith(process.env.AZURE_CONNECTION_KEY);
        expect(mockBlobServiceClient.getContainerClient).toHaveBeenCalledWith(process.env.AZURE_CONTAINER);
    });

    it("should handle error", async () => {
        // Mock Azure storage objects
        const mockBlobServiceClient = {
            getContainerClient: jest.fn().mockImplementation(() => {
                throw new Error("Connection error");
            }),
        };
        BlobServiceClient.fromConnectionString.mockReturnValue(mockBlobServiceClient);

        // Mock file data
        const file = {
            originalname: "example.jpg",
            mimetype: "image/jpeg",
            buffer: Buffer.from("image content"),
            size: 12345,
        };

        const fileName = "testfile";

        await expect(uploadImage.uploadImage(file, fileName)).rejects.toThrow("Internal server error");

        expect(BlobServiceClient.fromConnectionString).toHaveBeenCalledWith(process.env.AZURE_CONNECTION_KEY);
        expect(mockBlobServiceClient.getContainerClient).toHaveBeenCalledWith(process.env.AZURE_CONTAINER);
    });
});
