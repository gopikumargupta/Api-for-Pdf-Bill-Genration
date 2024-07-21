import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.cors = cors({
  origin: process.env.CORS,
  credentials: true,
});

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
import router from "../router/router.js";

app.use("/generate-invoice", router);

export { app };
