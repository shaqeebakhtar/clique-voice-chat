const router = require("express").Router();

router.post("/api/get-otp", (req, res) => {
  res.send("hello your otp");
});

module.exports = router;
