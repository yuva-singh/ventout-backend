const asyncHandler = require("express-async-handler");
const { WithdrawRequest } = require("../../models/Admin/withdrawRequestModel");

const getWithdrawrequests = asyncHandler(async (req, res) => {
  const requests = await WithdrawRequest.find().sort({ isApproved: 1 });

  if (!requests) {
    res.status(404);
    throw new Error("No Withdraw request found!");
  }

  res.status(200).json(requests);
});

const approveRequest = asyncHandler(async (req, res) => {
  const withdrawRequestId = req.params.id;
  const { isApproved } = req.body;

  const approve = await WithdrawRequest.findByIdAndUpdate(withdrawRequestId, {
    isApproved,
  });

  if (!approve) {
    res.status(500);
    throw new Error("Server Error!");
  }

  res.status(200).json({ message: "Request Approved Successfully!" });
});

module.exports = {
  getWithdrawrequests,
  approveRequest,
};
