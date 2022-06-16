const { User } = require("../../models");

exports.index = async (req, res) => {
    const users = await User.findAll({});
        res.render("pages/users/index", {
            title: "Daftar Player",
            users,
        });
 }

exports.create = async (req, res) => {
    res.render("pages/users/create", { title: "Create User" });
}

exports.store = async (req, res) => {
    const user = await User.create({
        username: req.body.username,
        password: req.body.password
    });
        res.redirect('/users');
};

exports.edit = async (req, res) => {
    const user = await User.findOne({
        where: { id: req.params.id },
      });
        res.render("pages/users/edit", {
        title: "Edit User",
        user,
        });
}

exports.update = async (req, res) => {
    const user = await User.update({
        username: req.body.username,
        password: req.body.password
    },
    {
      where: {
        id: req.params.id,
      },
    });
        res.redirect('/users');
}

exports.destroy = async (req, res) => {
    const hapus = User.destroy({
        where: {
          id: req.params.id,
        },
    });
        res.redirect('/users');
}