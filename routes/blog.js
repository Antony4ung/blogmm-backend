const { getAllBlogs, createBlog, updateBlog, deleteBlogById, getBlogById, getBlogByCategory,getBlogByAuthorId } = require("../controllers/blog");
const multerFun = require('../utils/multerFun')
const router = require("express").Router();

router.get("/", getAllBlogs);
router.post("/create",multerFun.upolad.single('image'), createBlog);
router.post("/edit/:id",multerFun.upolad.single('image'), updateBlog);


router.get("/blogId/:blogId", getBlogById);
router.get("/author/:authorId", getBlogByAuthorId);
router.get("/category/:category", getBlogByCategory);



router.delete("/:blogId", deleteBlogById);




module.exports = router;