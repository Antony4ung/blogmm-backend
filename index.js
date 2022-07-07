require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");
const { default: mongoose } = require("mongoose");
const authRouter = require("./routes/auth");
const blogRouter = require("./routes/blog");
const userRuter = require("./routes/user");
const { readFileSync } = require("fs");
const app = express();
// const connectToDatabase = require('./utils/dbConnect');
const { upolad } = require("./utils/multerFun");
const image = require("./models/image");
const { deleteBlogById } = require("./controllers/blog");
// Enable CORS
app.use(cors());

// Set HTTP Headers
app.use(helmet());

// Set Rate Limit
const limiter = rateLimit({
  windowMs: 7 * 60 * 1000, // 7 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Db connected")
})

app.use("/uploads", express.static("./uploads"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/user", userRuter);


app.get("*", (req, res, next) => {
  res.send("Invalid Route");
});

// app.post("/api/v1/uploadImage",upolad.single('image'),async (req, res) => {

//   const image = readFileSync(req.file.path);

//   const encoded_image = image.toString("base64");

//   const finalImg = {
//     contentType: req.file.mimetype,
//     path: req.file.path,
//     image: new Buffer(encoded_image, "base64"),
//   };

//   const client = await connectToDatabase()

//   client.db().collection("images").insertOne(finalImg,
//     (err,res)=>{
//     // console.log(res)

//     if(err){
//         console.log(err)
//         return
//     }

//     return
//     // console.log(res)

//   }
//   )

  

//   res.status(201).json({success:true,message:"IMage uploaded"})


// });

app.post("/api/v1/uploadImage",upolad.single('image'),async (req, res) => {

  // console.log(req.file)

  const newImage = new image({
    data: readFileSync(req.file.path),
    contentType:req.file.mimetype
  })

  const result = await newImage.save()

  if(!result){
    res.status(500).json({success:false})
    return
  }

  res.status(200).json({message:'created',success:true})

})

app.listen(process.env.PORT || 3001, () => {
    console.log("server is running at port 3001");
});