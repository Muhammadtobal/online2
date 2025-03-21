import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const categoryPath = path.join(__dirname, "..", "uploads", "category");
const productPath = path.join(__dirname, "..", "uploads", "products");
function deleteFile(fileName, uploadPathw) {
  try {
    const filePath = path.join(uploadPathw, fileName);

    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete file: ${filePath}`, err);
        } else {
          console.log(`File deleted successfully: ${filePath}`);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}
export { categoryPath, productPath, deleteFile };
