const mongoose = require("mongoose");

const adminStorytorySchema = mongoose.Schema({
  title: {
    type: String,
  },
  subTitle: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const AdminStory = mongoose.model("AdminStory", adminStorytorySchema);

module.exports = {
  AdminStory,
};
