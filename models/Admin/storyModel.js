const mongoose = require("mongoose");

const adminStorySchema = mongoose.Schema(
  {
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
    indexTime: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

////////// Story Views Schema //////////
const adminStoryViewSchema = mongoose.Schema(
  {
    storyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminStory",
    },
    viewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const AdminStory = mongoose.model("AdminStory", adminStorySchema);
const StoryView = mongoose.model("StoryView", adminStoryViewSchema);

module.exports = {
  AdminStory,
  StoryView,
};
