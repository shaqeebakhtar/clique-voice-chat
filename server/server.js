require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5500;

const connectDB = require("./database");
const router = require("./routes");
const cors = require("cors");

const corsOption = {
  credentials: true,
  origin: ["http://localhost:5173/"],
};
app.use(cors(corsOption));

connectDB();
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});
