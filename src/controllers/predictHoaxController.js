import multer from "multer";
import { PrismaClient } from "@prisma/client";
import apiAdapter from "../utils/apiAdapter.js";
// const apiAdapter = require("../utils/.js");

const prisma = new PrismaClient();
const URL_SERVICE_PREDICT = "https://flask-predict-production.up.railway.app";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now(); // Mendapatkan timestamp saat ini
    const fileExtension = file.originalname.split(".").pop(); // Mendapatkan ekstensi file asli
    const newFileName = `${timestamp}.${fileExtension}`; // Gabungkan timestamp dengan ekstensi file
    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage }).single("image");

const predictHoaxController = {
  predict: async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Failed to upload image",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          status: "error",
          message: "No image uploaded",
        });
      }

      const { filename } = req.file;

      // Mendapatkan informasi pengguna dari token
      const Auth = req.userData;

      try {
        // Membuat prediksi baru
        const predict = await prisma.predicts.create({
          data: {
            result: "fakta",
            image_url: `${process.env.APP_URL}/uploads/${filename}`,
            userId: Auth.id, // Menggunakan id pengguna sebagai userId
          },
        });

        return res.json({
          status: "success",
          message: "Image uploaded successfully",
          filename: filename,
          data: predict,
        });
      } catch (error) {
        return res.status(500).json({
          status: "error",
          message: "Failed to create prediction",
          error: error.message,
        });
      }
    });
  },
  predictService: async (req, res) => {
    const api = apiAdapter(URL_SERVICE_PREDICT);

    try {
      const response = await api.post("/predict", req.body);
      const data = response.data;

      // Mengembalikan response dari service prediksi
      return res.json({
        status: "success",
        data: data,
      });
    } catch (error) {
      if (error.code === "ECONNREFUSED") {
        return res.status(500).json({
          status: "error",
          message: "service unavailable",
        });
      }
      const { status, data } = error.response;
      return res.status(status).json({
        status: "error",
        message: data.message || "An error occurred",
        data: data,
      });
    }
  },

  histories: async (req, res) => {
    const Auth = req.userData;

    try {
      const predicts = await prisma.predicts.findMany({
        where: {
          userId: Auth.id,
        },
      });
      return res.json({
        message: "success",
        data: predicts,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Failed to create prediction",
        error: error.message,
      });
    }
  },
};

export default predictHoaxController;
