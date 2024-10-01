import multer from "multer";
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  diskStorage,
});

const memStorage = multer.memoryStorage();

export const uploadBuffer = multer({
  memStorage,
});
