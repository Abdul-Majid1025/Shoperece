const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const fs = require("fs");
// const getStream = require("into-stream");
// import intoStream from "into-stream";
const { Readable } = require("stream");
async function main(media, name) {
    console.log("Azure Blob storage v12 - JavaScript quickstart sample");
    // Quick start code goes here
    // Retrieve the connection string for use with the application. The storage
    // connection string is stored in an environment variable on the machine
    // running the application called AZURE_STORAGE_CONNECTION_STRING. If the
    // environment variable is created after the application is launched in a
    // console or with Visual Studio, the shell or application needs to be closed
    // and reloaded to take the environment variable into account.
    const AZURE_STORAGE_CONNECTION_STRING =
        process.env.AZURE_STORAGE_CONNECTION_STRING;

    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING
    );
    //   const getBlobName = (originalName) => {
    //     // Use a random number to generate a unique file name,
    //     // removing "0." from the start of the string.
    //     const identifier = Math.random().toString().replace(/0\./, "");
    //     return `${identifier}-${originalName}`;
    //   };
    // Create a unique name for the container
    //   const containerName = "quickstart" + uuidv1();

    //   console.log("\nCreating container...");
    //   console.log("\t", containerName);

    // Get a reference to a container
    const containerName = "quickstart3f81cab0-2853-11ec-96b9-114a6f977e74";
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Create the container
    //   const createContainerResponse = await containerClient.create();
    //   console.log(
    //     "Container was created successfully. requestId: ",
    //     createContainerResponse.requestId
    //   );

    // Create a unique name for the blob
    const blobName = "quickstart" + uuidv1() + name;

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    console.log("\nUploading to Azure storage as blob:\n\t", blobName);

    // Upload data to the blob
    //   const data = "Hello, World!";
    //   const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
    //   console.log(
    //     "Blob was uploaded successfully. requestId: ",
    //     uploadBlobResponse.requestId
    //   );
    const stream = fs.readFileSync("./best-pizza-in-lahore.jpg");
    const stream1 = Readable.from(stream.buffer.toString("base64"));
    //   console.log(stream1);
    const ONE_MEGABYTE = 1024 * 1024;
    const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };
    const uploadBlobResponse = await blockBlobClient.uploadFile(
        "./best-pizza-in-lahore.jpg", { blobHTTPHeaders: { blobContentType: "image/jpeg" } }
    );
    //   const uploadBlobResponse = await blockBlobClient.uploadStream(
    //     stream1,
    //     uploadOptions.bufferSize,
    //     uploadOptions.maxBuffers,
    //     { blobHTTPHeaders: { blobContentType: "image/jpeg" } }
    //   );
    console.log("Uploaded successfully");
    console.log(uploadBlobResponse);

    console.log("\nListing blobs...");

    // List the blob(s) in the container.
    for await (const blob of containerClient.listBlobsFlat()) {
        console.log("\t", blob.name);
    }
}

main()
    .then(() => console.log("Done"))
    .catch((ex) => console.log(ex.message));
// const stream = fs.readFileSync("./best-pizza-in-lahore.jpg");
// console.log(stream.length);