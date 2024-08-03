var express = require("express");
var router = express.Router();

router.use("/auth", require("./therapistRoute"));
router.use("/wallet", require("./walletRoute"));

module.exports = router;
