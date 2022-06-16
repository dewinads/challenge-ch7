const { User } = require("../../models");
const { Profile } = require("../../models");

exports.index = async (req, res) => {
    const profiles = await Profile.findAll({
      order: [["fullName", "ASC"]],
      include: ["User"]
    }); 

    res.render("pages/profiles/index", {
      title: "Daftar Profile",
      profiles,
    })
}

exports.create = async (req, res) => {
    const users = await User.findAll({
        order: [["username", "ASC"]],
      })
        res.render("pages/profiles/create", {
            title: "Create Profile",
            users,
        })
}

exports.store = async (req, res) => {
  const profile = await Profile.create({
    fullName : req.body.fullName,
    address : req.body.address,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
    userGameId: req.body.userGameId,
  });
    res.redirect("/profiles");
}

exports.show = async (req, res) => {
  const profile = await Profile.findOne({
    where: { id: req.params.id },
    include: ["User"],
  });
    res.render("pages/profiles/show", {
      title: "Detail Profile",
      profile,
    });
}

exports.edit = async (req, res) => {
  const profile = await Profile.findOne({
    where: { id: req.params.id },
  });

  const users = await User.findAll({
    order: [["username", "ASC"]],
  });

  res.render("pages/profiles/edit", {
    title: "Update Profile",
    profile,
    users,
  });
}

exports.update = async (req, res) => {
    const profiles = await Profile.update({
        fullName : req.body.fullName,
        address : req.body.address,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
        userId: req.body.userId,
    },
    {
      where: { id: req.params.id,
    },
  });
    res.redirect("/profiles");
}

exports.destroy = async (req, res) => {
  const profiles = Profile.destroy({
    where: {
      id: req.params.id,
    },
  });
    res.redirect("/profiles");
}