const { Admin } = require("../../models");

    exports.index = (req, res) => {
    res.render("pages/admin/login", { title: "Login Admin"});
    }

    exports.create = (req, res) => {
        res.render("pages/admin/create", { title: "Create User Admin"});
    }

    exports.show = async (req, res) => {
        const admin = await Admin.findAll({});
        res.render("pages/admin/index", {
            title: "Data Admin",
            admin,
        });
    }

    exports.destroy = async (req, res) => {
        const hapus = await Admin.destroy({
            where: {
              id: req.params.id,
            },
        });
        res.redirect("/admin");
    }