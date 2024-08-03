var express = require("express");
var router = express.Router();

router.use("/auth", require("./userRoute"));
router.use("/wallet", require("./walletRoute"));
router.use("/booking", require("./bookingRoute"));

module.exports = router;
