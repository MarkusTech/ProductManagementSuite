import multer, { StorageEngine } from "multer";
import path from "path";

// Multer config
const storage: StorageEngine = multer.diskStorage({});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const ext = path.extname(file.originalname);
  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    // Use 'null' for the error argument and pass 'false' for rejection
    cb(new Error("File type is not supported") as any, false);
    return;
  }
  cb(null, true); // Accept the file
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
