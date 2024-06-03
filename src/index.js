import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import predictHoaxRoutes from "./routes/predictHoaxRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Menyajikan file statis dari folder 'uploads'
app.use("/uploads", express.static(join(__dirname, "../uploads")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/predict", predictHoaxRoutes);
app.use("/news", authMiddleware, newsRoutes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
