const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");

class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;

    if (!phone) {
      res.status(400).json({ message: "Phone no. is required" });
    }

    const otp = await otpService.generateOtp();

    const timeToLeave = 1000 * 60 * 5; // expire time 5 min
    const expires = Date.now() + timeToLeave;
    const data = `${phone}.${otp}.${expires}`;

    const hashedOtp = await hashService.generateHash(data);

    try {
      await otpService.sendOtpBySms(phone, otp);
      res.json({
        hash: `${hashedOtp}.${otp}`,
        phone,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "failed to send message" });
    }

    res.json({ hashedOtp: hashedOtp });
  }

  async verifyOtp(req, res) {
    const { phone, otp, hash } = req.body;
    if (!phone || !otp || !hash) {
      res.status(400).json({ message: "all fields are required" });
    }

    const [hashedOtp, expires] = hash.split(".");
    if (Date.now() > expires) {
      res.status(400).json({ message: "otp expired!" });
    }

    const data = `${phone}.${otp}.${expires}`;

    const isValidOtp = otpService.verifyOtp(hashedOtp, data);
    if (!isValidOtp) {
      res.status(400).json({ message: "Invalid OTP" });
    }
  }
}

module.exports = new AuthController();
