const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique:true
    },
    email: {
      type: String,
      require: true,
      unique:true
    },
    photoUrl: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      require: true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    // data:{
    //   blogs:[
    //     {
    //       blogId:{
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"Blog",
    //         require:true
    //       }
    //     }
    //   ]
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User',userSchema);