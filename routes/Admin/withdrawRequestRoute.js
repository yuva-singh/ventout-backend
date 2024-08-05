const express = require("express");
const {
  getWithdrawrequests,
  approveRequest,
} = require("../../controllers/Admin/requestWithdrawController");

const router = express.Router();

router.get("/get", getWithdrawrequests);
router.patch("/approve/:id", approveRequest);

module.exports = router;
