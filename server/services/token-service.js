const jwt = require("jsonwebtoken");
const refreshModel = require("../models/refresh-model");

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const accessRefreshSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(payload, accessRefreshSecret, {
      expiresIn: "1y",
    });

    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token, userId) {
    try {
      await refreshModel.create({
        token,
        userId,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new TokenService();
