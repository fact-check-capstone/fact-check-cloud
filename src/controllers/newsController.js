import { writeFile } from "fs/promises";
import getNews from "../services/newsScraper.js";
import news from "../dummy/news.json" assert { type: "json" };

const newsController = {
  news: async (req, res) => {
    // const Auth = req.userData;

    let newsList = news;
    try {
      if (req.query.refresh == "ok") {
        newsList = await getNews();

        await writeFile(
          "src/dummy/news.json",
          JSON.stringify(newsList),
          "utf8"
        );
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
