const LocalStrategy = require('passport-local').Strategy;

const localStrategy = new LocalStrategy((username, password, done) => {
  // اینجا باید کاربر رو بررسی کنی (از دیتابیس، فایل یا هر چی)
  if (username === 'admin' && password === '1234') {
    return done(null, { id: 1, username: 'admin' });
  } else {
    return done(null, false, { message: 'نام کاربری یا رمز عبور اشتباه است' });
  }
});

module.exports = localStrategy;
