const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema(
  {
    data: Buffer,
    contentType: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("image", imageSchema);
