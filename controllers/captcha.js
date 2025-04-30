const svgCaptcha = require("svg-captcha");
const { v4: uuidv4 } = require("uuid");
const  redis  = require("../redis");

exports.get = async (req, res, next) => {
  const captcha = svgCaptcha.create({
    size: 4,
    noise: 5,
  });

  const uuid = uuidv4();

  await redis.set(`captcha : ${uuid}` , captcha.text.toLowerCase() , "EX" , 60 * 50);

  res.json({
    uuid,
    captcha : captcha.data
  });
};
