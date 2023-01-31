require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5500;

const router = require("./routes");
app.use(router);

app.get("/api", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, () => console.log(`Listening on PORT:${PORT}`));
