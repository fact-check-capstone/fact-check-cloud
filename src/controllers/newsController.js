//import { writeFile } from "fs/promises";
import getNews from "../services/newsScraper.js";
//import news from "../dummy/news.json" assert { type: "json" };

import { Storage } from "@google-cloud/storage";
const storage = new Storage();

// Your bucket name
const bucketName = 'jagafakta';
const fileName = 'news.json';


const newsController = {
  news: async (req, res) => {
    // const Auth = req.userData;

    const file = storage.bucket(bucketName).file(fileName);
    const news = await file.download();

    let newsList = news;
    try {
      if (req.query.refresh == "ok") {
        try {
          newsList = await getNews();

          const file = storage.bucket(bucketName).file(fileName);
          await file.save(JSON.stringify(newsList));
        } catch (error) {
          return res.status(500).json({
            message: "Gagal mendapatkan berita",
          });
        }
      }

      return res.json({
        message: "berhasil",
        data: newsList,
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        // status: "gagal",
        message: "Berita tidak ditemukan",
        // error: error.message,
      });
    }
  },
};

export default newsController;
