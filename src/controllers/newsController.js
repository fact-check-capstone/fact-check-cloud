import { PrismaClient } from "@prisma/client";
import news from "../dumy/news.json" assert { type: "json" };

const prisma = new PrismaClient();

const newsController = {
  news: async (req, res) => {
    const Auth = req.userData;

    try {
      return res.json({
        message: "success",
        data: news,
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

export default newsController;
