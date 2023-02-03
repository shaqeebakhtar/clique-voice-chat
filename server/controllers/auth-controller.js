const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const UserDto = require("../dtos/user-dto");

class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone no. is required" });
    }

    const otp = await otpService.generateOtp();

    const timeToLeave = 1000 * 60 * 5; // expire time 5 min
    const expires = Date.now() + timeToLeave;

    const data = `${phone}.${otp}.${expires}`;
    const hashedOtp = await hashService.generateHash(data);

    try {
      // await otpService.sendOtpBySms(phone, otp);
      return res.json({
        hash: `${hashedOtp}.${expires}`,
        phone,
        otp,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "failed to send message" });
    }
  }

  async verifyOtp(req, res) {
    const { otp, hash, phone } = req.body;
    if (!otp || !hash || !phone) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const [hashedOtp, expires] = hash.split(".");

    if (Date.now() > +expires) {
      return res.status(400).json({ message: "OTP expired!" });
    }

    const data = `${phone}.${otp}.${expires}`;

    const isValidOtp = await otpService.verifyOtp(hashedOtp, data);
    if (!isValidOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // create user

    let user;

    try {
      user = await userService.findUser({ phone });
      if (!user) {
        user = await userService.createUser({ phone });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "database error" });
    }

    // JWT Token
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      activated: false,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
    });

    const userDto = new UserDto(user);
    return res.json({ accessToken, user: userDto });
  }
}

module.exports = new AuthController();
