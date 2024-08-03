const express = require("express");

const router = express.Router();

router.use("/user", require("./User/routes"));
router.use("/admin", require("./Admin/routes"));
router.use("/therapist", require("./Therapist/routes"));

module.exports = router;
