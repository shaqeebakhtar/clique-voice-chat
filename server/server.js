require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5500;

const connectDB = require("./database");
const router = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
const corsOption = {
  credentials: true,
  origin: ["http://localhost:5173/"],
};
app.use(cors(corsOption));
app.use("/storage", express.static("storage"));

connectDB();
app.use(express.json({ limit: "5mb" }));
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});
