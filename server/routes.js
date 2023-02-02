const router = require("express").Router();
const authController = require("./controllers/auth-controller");

router.post("/api/get-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);

module.exports = router;
