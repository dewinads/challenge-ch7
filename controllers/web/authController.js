const { Admin } = require("../../models");
const passport = require("../../lib/passport");


module.exports = {
    register: async (req, res, next) => {
        try{
        await Admin.register(req.body);
        res.redirect("/login");
        } catch(err) {
        next(err);
        }
    },

    login: passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/",
        failureFlash: true,
    })
};