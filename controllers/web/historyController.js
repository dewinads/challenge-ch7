const { History } = require("../../models");
const { Playerroom } = require("../../models");

exports.index = async (req, res) => {
    const histories = await History.findAll({
      include: ["Playerroom"]
    }); 

    res.render("pages/history/index", {
      title: "Log History",
      histories,
    })
} 