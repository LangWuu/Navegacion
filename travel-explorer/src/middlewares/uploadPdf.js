import multer from "multer";
import path from "path";

//  solo PDF
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (ext !== ".pdf") {
    return cb(new Error("Solo se permite subir archivos PDF"));
  }

  cb(null, true);
};

// Configuración del storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
  cb(null, path.join(process.cwd(), "uploads", "cv"));
},

  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

export const uploadPdf = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 } // 3MB como maximo
});
