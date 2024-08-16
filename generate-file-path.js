const fs = require("fs");
const path = require("path");

const fileDir = path.join(__dirname, "public/files");
const outputFilePath = path.join(__dirname, "public/files/file-paths.json");

function getfilePaths(dir) {
  let filePaths = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      filePaths = filePaths.concat(getfilePaths(filePath));
    } else if (
      /\.(pdf|docx|doc|pptx|png|jpeg|rar|7z|gsp|mp4|tmp|zip)$/.test(file)
    ) {
      filePaths.push(
        filePath.replace(__dirname, "").replace(/\\/g, "/").substring(1)
      );
    }
  });

  return filePaths;
}

const filePaths = getfilePaths(fileDir);

const jsonContent = JSON.stringify({ files: filePaths }, null, 2);

fs.writeFile(outputFilePath, jsonContent, (err) => {
  if (err) {
    console.error("Error writing JSON file:", err);
  } else {
    console.log("file paths JSON file generated successfully.");
  }
});
