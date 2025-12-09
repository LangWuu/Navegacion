import express from "express";
import { registrarGuia, loginGuia } from "../controllers/guiaController.js";
import { uploadPdf } from "../middlewares/uploadPdf.js";

const router = express.Router();

router.post(
  "/register",
  uploadPdf.single("cv"),
  (req, res, next) => {
    console.log("CAMPOS RECIBIDOS:", req.body);
    next();
  },
  registrarGuia
);
router.post("/login", loginGuia);

export default router;
