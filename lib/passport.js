const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { User, Admin } = require("../models");

async function authenticate(username, password, done) {
  try {
    const admin = await Admin.authenticate({ username, password });
    /*
     done adalah callback, parameter pertamanya adalah error,
     jika tidak ada error, maka kita beri null saja.
     Parameter keduanya adalah data yang nantinya dapat
     kita akses di dalam req.user
    */
    return done(null, admin);
  } catch (err) {
    /* Parameter ketiga akan dilempar ke dalam flash */
    return done(null, false, { message: err.message });
  }
}

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    authenticate
  )
);

/* Serialize dan Deserialize
   Cara untuk membuat sesi dan menghapus sesi
 */
passport.serializeUser((admin, done) => done(null, admin.id));
passport.deserializeUser(async (id, done) =>
  done(null, await Admin.findByPk(id))
);

// Pasport JWT Options
const options = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: "Rahasia ya",
  };
  
  passport.use(
    new JwtStrategy(options, async(payload, done) => {
      User.findByPk(payload.id)
      .then((user) => done(null, user))
      .catch((err) => done(err, false));
    })
  );

// Kita exports karena akan kita gunakan sebagai middleware
module.exports = passport;