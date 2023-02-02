require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5500;

const router = require("./routes");

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`Listening on PORT:${PORT}`));
