var express = require("express");
var router = express.Router();

router.use("/auth", require("./adminRoute"));
router.use("/category", require("./categoryRoute"));
router.use("/story", require("./storyRoute"));
router.use("/moneyRequest", require("./withdrawRequestRoute"));

module.exports = router;
