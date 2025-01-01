import multer from "multer";
import fs from "fs";
import path from "path";

const mediaStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadDirectory =
      req.params.type === "profilePhoto"
        ? path.join(
            process.cwd(),
            "uploads",
            "/",
            req.params.username,
            "/",
            "profilePhoto",
          )
        : path.join(
            process.cwd(),
            "uploads",
            "/",
            req.params.username,
            "/",
            "blogImage",
          );
    fs.mkdir(uploadDirectory, { recursive: true }, (err) => {
      if (err) {
        console.error("Error creating directory:", err);
        return;
      }
      {
        req.params.type === "profilePhoto"
          ? fs.readdir(uploadDirectory, (err, files) => {
              if (err) {
                console.error("Error reading directory:", err);
                return;
              }
              if (files.length !== 0) {
                const filePath = path.join(uploadDirectory, files[0]);
                fs.rm(filePath, (err) => {
                  if (err) {
                    console.error("Error deleting file:", err);
                    return;
                  }
                  callback(null, uploadDirectory);
                });
              } else {
                callback(null, uploadDirectory);
              }
            })
          : callback(null, uploadDirectory);
      }
    });
  },
  filename: (
    req,
    file,
    callback: (error: Error | null, filename: string) => void,
  ) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: mediaStorage });
export default upload;
