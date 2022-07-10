const Blog = require("../models/blog")

const getAllBlogs = async (req,res,next) => {
    try {

        const PAGE_SIZE = 8;
        const page = Number(req.query.page || "0");
        const total = await Blog.countDocuments({});
        

        const blog = await Blog.find().populate('author','-password -isAdmin').skip(PAGE_SIZE*(page-1)).limit(PAGE_SIZE);

        if(!blog){
            res.status(404).json({message:"blogs not found"})
        }

        res.status(200).json({totalPages: Math.ceil(total / PAGE_SIZE),blog})

    } catch (error) {
        res.status(500).json(error)
        return
    }
}
const createBlog = async (req,res,next) => {
    try {
        
    
        const { title, description, author,category,content,photoUrl } = req.body;

        if(!title || !description || !content || !author || !category || !photoUrl ){
            res.status(400).json({message:"Can't create blog. Fill all require fields"})
            return;
        }
    
    
        const newBlog = new Blog({
            title, description,content, author,category,photoUrl
        });
    
        const status = await newBlog.save();
    
        res.status(201).json({ message: "newBlog created",success:true });
        return;
      } catch (error) {
        res.status(500).json(error);
        return;
      }
    }
const updateBlog = async (req,res,next) => {
    
    try {
        
    
        const { title, description,category,content,blogId,photoUrl } = req.body;


        if(!title || !description || !content || !category || !photoUrl ){
            res.status(400).json({message:"Can't create blog. Fill all require fields"})
            return;
        }
    
        const result = await Blog.findByIdAndUpdate({_id:blogId},{
            title,description,content,photoUrl,category
        })
    
        res.status(201).json({ message: "blog edited",success:true });
        return;
      } catch (error) {
        res.status(500).json(error);
        return;
      }
}

const getBlogById = async (req,res,next) => {
    try {
        const {blogId} = req.params
        const blog = await Blog.findOne({_id:blogId}).populate('author','-password -isAdmin')

        if(!blog){
            res.status(404).json({message:"blog not found"})
        }

        res.status(200).json({blog})

    } catch (error) {
        res.status(500).json(error)
        return
    }
}

const getBlogByCategory = async (req,res,next) => {
    try {


        const PAGE_SIZE = 8;
        const page = Number(req.query.page || "0");
        // const total = await Blog.countDocuments({});

        const {category} = req.params
        const blog = await Blog.find({category:category}).populate('author','-password -isAdmin').skip(PAGE_SIZE*(page-1)).limit(PAGE_SIZE)

        const total = blog.length

        if(!blog){
            res.status(404).json({message:"blog not found"})
            return
        }

        res.status(200).json({totalPages: Math.ceil(total / PAGE_SIZE),blog})

    } catch (error) {
        res.status(500).json(error)
        return
    }
}

const getBlogByAuthorId = async (req,res,next) => {
    try {
        const {authorId} = req.params

        const blogs = await Blog.find({author:authorId}).populate('author','-password -isAdmin')

        if(!blogs){
            res.status(404).json({message:"blog not found"})
            return
        }

        res.status(200).json({blogs})
        return

    } catch (error) {
        res.status(500).json(error)
        return
    }
}

const deleteBlogById = async (req,res,next) => {
    try {
        const {blogId} = req.params
        const blogFound = await Blog.findOneAndDelete({_id:blogId})

        if(!blogFound){
            res.status(404).json({message:"blog not found can't delete"})
        }

        res.status(200).json({message:"Deleted"})

    } catch (error) {
        res.status(500).json(error)
        return
    }
}


module.exports = {
    getAllBlogs,createBlog,updateBlog,deleteBlogById,getBlogById,getBlogByCategory,getBlogByAuthorId
}