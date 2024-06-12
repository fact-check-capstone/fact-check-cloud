import multer from "multer";
import { PrismaClient } from "@prisma/client";
import apiAdapter from "../utils/apiAdapter.js";
import {
  getDataByUserId,
  storeData,
  deleteData,
} from "../services/storeData.js";
import crypto from "crypto";
// const apiAdapter = require("../utils/.js");

const prisma = new PrismaClient();
const URL_SERVICE_PREDICT = "https://flask-predict-production.up.railway.app";
const URL_SERVICE_PREDICT_V2 = "https://jagafakta-capstone.et.r.appspot.com";

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
    const api = apiAdapter(URL_SERVICE_PREDICT_V2);
    const id = req.params.id;
    const Auth = {
      id,
    };

    try {
      const formData = new FormData();
      formData.append("text", req.body.text);

      // Mengirim permintaan POST dengan FormData
      const response = await api.post(
        `${URL_SERVICE_PREDICT_V2}/predict`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = {
        userId: Auth.id,
        text: req.body.text,
        result: response.is_hoax ? "hoax" : "fact",
      };
      const uniqId = crypto.randomUUID();
      storeData(uniqId, data);
      return res.json({
        message: "berhasil",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error",
      });
    }
  },

  histories: async (req, res) => {
    const id = req.params.id;

    const Auth = {
      id,
    };

    try {
      const data = await getDataByUserId(Auth.id);
      if (data) {
        return res.json({
          message: "berhasil",
          data: data,
        });
      } else {
        return res.status(404).json({
          message: "Tidak ada data yang ditemukan",
        });
      }
    } catch (error) {
      console.error("Error getting data:", error);
      return res.status(500).json({
        message: "gagal",
      });
    }
  },

  deleteByIdPredict: async (req, res) => {
    const id = req.params.id;

    try {
      await deleteData(id);
      return res.json({
        message: "Prediksi berhasil dihapus",
      });
    } catch (error) {
      console.error("Error:", error); // Menambahkan log kesalahan
      return res.status(500).json({
        message: "error",
        error: error.message, // Mengirim pesan kesalahan kembali ke klien
      });
    }
  },
};

export default predictHoaxController;
