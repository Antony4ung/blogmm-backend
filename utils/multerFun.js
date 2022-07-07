const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname))

    }
})

const upolad = multer({
    storage:storage,
    limits:{fileSize:'1000000'},
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|svg|jpeg)$/)) { 
           // upload only png and jpg format
           return cb(new Error('Please upload a Image'))
         }
       cb(undefined, true)
    }
})

module.exports = {upolad};