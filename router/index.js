const router = require("express").Router();
const webRouter = require("./web");
const apiRouter = require("./api");

router.use("/", webRouter);
router.use("/api", apiRouter);

module.exports = router;