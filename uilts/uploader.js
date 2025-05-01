const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "public", "images" , "covers"));
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + Math.floor(Math.random() * 9999);
    const ext = path.extname(file.originalname);
    cb(null, fileName + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only image files (JPEG, PNG, GIF, WEBP) are allowed!"),
      false
    );
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter,
});

module.exports = upload;
