// Importing necessary modules
const { removeBackground } = require("@imgly/background-removal-node");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to remove background from an image
async function removeImageBackground(imgSource) {
  try {
    // Removing background
    const blob = await removeBackground(imgSource);

    // Converting Blob to buffer
    const buffer = Buffer.from(await blob.arrayBuffer());

    // Generating data URL
    const dataURL = `data:image/png;base64,${buffer.toString("base64")}`;

    // Returning the data URL
    return dataURL;
  } catch (error) {
    // Handling errors
    throw new Error("Error removing background: " + error);
  }
}

// Example usage
async function main(imageSource = "") {
  try {
    // Removing background from the input image
    const resultDataURL = await removeImageBackground(imageSource);

    const splited = imageSource.split("/");
    const filename = splited.pop();
    const location = splited.join("/");
    console.log("LOCATION", location, filename);

    // Writing the result to a file (optional)
    fs.writeFileSync(
      location + "/removed_bg_" + filename,
      resultDataURL.split(";base64,").pop(),
      {
        encoding: "base64",
      }
    );

    // Logging success message
    console.log("Background removed successfully.");
  } catch (error) {
    // Logging error message
    console.error("Error:", error.message);
  }
}

rl.question("Enter image file path: ", async (filePath) => {
  console.log("FILE PATH", filePath);
  await main(filePath);
  rl.close();
});
