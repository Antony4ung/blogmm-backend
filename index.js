require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");
const { default: mongoose } = require("mongoose");
const authRouter = require("./routes/auth");
const blogRouter = require("./routes/blog");
const userRuter = require("./routes/user");
const app = express();
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

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/user", userRuter);


app.get("*", (req, res, next) => {
  res.send("Invalid Route");
});


app.listen(process.env.PORT || 3001, () => {
    console.log("server is running at port 3001");
});