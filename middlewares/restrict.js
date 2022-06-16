const passport = require("../lib/passport");

module.exports = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/home");
};

module.exports = passport.authenticate("jwt", {
    session:false,
});