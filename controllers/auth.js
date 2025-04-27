const { User } = require("../db");
const bcrypt = require("bcrypt");
const configs = require("../configs");
const redis = require("../redis");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

exports.register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const usersCount = await User.count();

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role: usersCount === 0 ? "Admin" : "User",
    });

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      configs.auth.accessTokenSecretKey,
      {
        expiresIn: configs.auth.accessTokenExpiresInSeconds + "s",
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      configs.auth.refreshTokenSecretKey,
      {
        expiresIn: configs.auth.refreshTokenExpiresInSeconds + "s",
      }
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    await redis.set(
      `RefreshToken:${user.id}:`,
      hashedRefreshToken,
      "EX",
      configs.auth.refreshTokenExpiresInSeconds
    );

    return res.status(201).json({
      message: "User created successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(
      "REGISTER ERROR:",
      error?.errors || error?.original || error.message || error
    );
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = req.user;

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      configs.auth.accessTokenSecretKey,
      {
        expiresIn: configs.auth.accessTokenExpiresInSeconds + "s",
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      configs.auth.refreshTokenSecretKey,
      {
        expiresIn: configs.auth.refreshTokenExpiresInSeconds + "s",
      }
    );

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    await redis.set(
      `RefreshToken:${user.id}:`,
      hashedRefreshToken,
      "EX",
      configs.auth.refreshTokenExpiresInSeconds
    );

    return res.status(200).json({
      message: "Login successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};
