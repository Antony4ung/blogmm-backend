const Blog = require("../models/blog")

const getAllBlogs = async (req,res,next) => {
    try {
        
        const blog = await Blog.find().populate('author','-password -isAdmin')

        if(!blog){
            res.status(404).json({message:"blogs not found"})
        }

        res.status(200).json({blog})

    } catch (error) {
        res.status(500).json(error)
        return
    }
}
const createBlog = async (req,res,next) => {
    try {
        console.log({body:req.body,file:req.file})

        const url = req.protocol + '://' + req.get('host')
    
        const { title, description, author,category,content } = req.body;

        if(!title || !description || !content || !author || !category || !req.file ){
            res.status(400).json({message:"Can't create blog. Fill all require fields"})
            return;
        }
    
    
        const newBlog = new Blog({
            title, description,content, author,category,photoUrl:url + '/uploads/' + req.file.filename
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
        // console.log({body:req.body,file:req.file})

        const url = req.protocol + '://' + req.get('host')
    
        const { title, description,category,content,blogId } = req.body;

        if(!title || !description || !content || !category || !req.file ){
            res.status(400).json({message:"Can't create blog. Fill all require fields"})
            return;
        }
    
        const result = await Blog.findByIdAndUpdate({_id:blogId},{
            title,description,content,photoUrl:url + '/uploads/' + req.file.filename,category
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
        const {category} = req.params
        const blog = await Blog.find({category:category}).populate('author','-password -isAdmin')

        if(!blog){
            res.status(404).json({message:"blog not found"})
            return
        }

        res.status(200).json({blog})

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