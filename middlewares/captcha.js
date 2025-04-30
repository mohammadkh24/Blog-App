const redis = require("../redis");

module.exports = async (req, res, next) => {
  const { uuid, captcha } = req.body;

  console.log(uuid , captcha);

  const catchCaptcha = await redis.get(`captcha:${uuid}`);

//   console.log(catchCaptcha , captcha);

  if (catchCaptcha) {
    await redis.del(`captcha:${uuid}`);
  }

  if (catchCaptcha !== captcha.toLowerCase()) {
    return res.status(401).json({
      message: "Invalid captcha",
    });
  }

  next();
};
