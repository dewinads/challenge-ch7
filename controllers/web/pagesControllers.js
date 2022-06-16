exports.home = (req, res) => {
    const title = "Hello World",
    subTitle = "Welcome to this world"

    res.render("index", { title, subTitle});
}