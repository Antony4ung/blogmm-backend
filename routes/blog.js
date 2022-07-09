const { getAllBlogs, createBlog, updateBlog, deleteBlogById, getBlogById, getBlogByCategory,getBlogByAuthorId } = require("../controllers/blog");
const router = require("express").Router();

router.get("/", getAllBlogs);
router.post("/create", createBlog);
router.post("/edit/:id", updateBlog);


router.get("/blogId/:blogId", getBlogById);
router.get("/author/:authorId", getBlogByAuthorId);
router.get("/category/:category", getBlogByCategory);



router.delete("/:blogId", deleteBlogById);




module.exports = router;