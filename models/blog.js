const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    content:{
      type: String,
      require: true,
    },
    photoUrl: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require:true
    },
    category: {
        type: String,
        require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog',blogSchema);