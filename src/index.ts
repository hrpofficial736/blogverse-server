import express from "express";
import routes from "./routes";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 7777;

app.listen(PORT, async () => {
  console.log(`App is listening on ${PORT}`);
});

app.get("/", async (req, res) => {
  res.send({ message: "Hello Harshit" });
});

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
  }),
);
app.use("/uploads", express.static(path.join(process.cwd(), "/", "uploads")));

app.use(express.json());
app.use("/api", routes);
