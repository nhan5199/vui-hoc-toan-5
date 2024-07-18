const fs = require("fs");
const path = require("path");

const imageDir = path.join(__dirname, "public/images");
const outputFilePath = path.join(__dirname, "public/images/image-paths.json");

function getImagePaths(dir) {
  let imagePaths = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      imagePaths = imagePaths.concat(getImagePaths(filePath));
    } else if (/\.(jpg|jpeg|png|gif)$/.test(file)) {
      imagePaths.push(
        filePath.replace(__dirname, "").replace(/\\/g, "/").substring(1)
      );
    }
  });

  return imagePaths;
}

const imagePaths = getImagePaths(imageDir);

const jsonContent = JSON.stringify({ images: imagePaths }, null, 2);

fs.writeFile(outputFilePath, jsonContent, (err) => {
  if (err) {
    console.error("Error writing JSON file:", err);
  } else {
    console.log("Image paths JSON file generated successfully.");
  }
});
