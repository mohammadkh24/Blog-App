const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const configs = require("../configs");
const { User } = require("../db");

module.exports = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: configs.auth.accessTokenSecretKey,
  },
  async (payload, done) => {
    try {
      const user = await User.findByPk(payload.id, {
        attributes: { exclude: ["password"] },
        raw: true,
      });

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err, false); 
    }
  }
);
