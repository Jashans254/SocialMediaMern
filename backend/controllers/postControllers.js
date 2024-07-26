import { Post } from "../models/postModel.js";
import TryCatch from "../utils/Trycatch.js";
import getDataUrl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";
export const newPost = TryCatch( async(req, res) =>{

    const {caption} = req.body;

    const ownderId = req.user._id;
    const file = req.file;

    const fileUrl = getDataUrl(file);

    let option 

    const type = req.query.type
    if(type ==="reel"){
        option = {
            resource_type : "video"
        }

    }else{
        option= {

        }
    }

    
const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content , option);

const post = await Post.create({
    caption ,
    post:{
        id:myCloud.public_id,
        url:myCloud.secure_url
    },
    owner:ownderId ,
    type,

})

res.status(201).json({
    message:"Post created",
    post,
})
})

export const deletePost = TryCatch(async(req , res)=>{

    const post = await Post.findById(req.params.id);

    if(!post){
        return res.status(404).json({
            message : "No post with this id"
        })
    }

    if(post.owner.toString() !== req.user._id.toString())
    {
        return res.status(403).json({
            message:"You are not authorized to delete this post"
        })
    }

    await cloudinary.v2.uploader.destroy(post.post.id);
    await post.deleteOne();

    res.json({
        message : "Post deleted"
    })

})

export const getAllPosts = TryCatch( async(req , res)=>{
    const posts = await Post.find({ type:"post"})
    .sort({createdAt : -1})
    .populate("owner","-password")
    .populate({
        path:"Comments.user",
        select:"-password"
    });

    const reels = await Post.find({ type:"reel"})
    .sort({createdAt : -1})
    .populate("owner","-password")
    .populate({
        path:"Comments.user",
        select:"-password"
    });

    res.json({ posts, reels });
})

export const likeUnlikePost = TryCatch(async(req , res)=>{
    const post = await Post.findById(req.params.id);

    if(!post){
        return res.status(404).json({
            message : "No post with this id"
        })
    }

    if(post.likes.includes(req.user._id)){
        const index = post.likes.indexOf(req.user._id);
        post.likes.splice(index , 1);
        await post.save();

        res.json({
            message : "Post Unliked"
        })
    }else{
        post.likes.push(req.user._id);

        await post.save();

        res.json({
            message : "Post Liked"
        })
    }
})

export const commentonPost = TryCatch(async(req , res)=>{
    const post = await Post.findById(req.params.id);

    if(!post){
        return res.status(404).json({
            message:"No post with this id",
        })
    }

  post.Comments.push({
    user:req.user._id , 
    name:req.user.name,
    Comment:req.body.comment
  })

  await post.save();

  res.json({
    message:"Comment added"
  })
})

export const deleteComment = TryCatch(async(req , res)=>{
    const post = await Post.findById(req.params.id);

    if(!post){
        return res.status(404).json({
            message:"No post with this id",
        })
    }

    if(!req.query.commentId)
    {
        return res.status(404).json({
            message:"Please provide comment id"
        })
    }

    const commentIndex = post.Comments.findIndex(
        (item) => item._id.toString() === req.query.commentId.toString() 
    )
    if(commentIndex === -1){
        return res.status(400).json({
            message:"Comment not found"
        })
    }

    const comment = post.Comments[commentIndex];

    if(post.owner.toString() === req.user._id.toString() || comment.user.toString() === req.user._id.toString()){ 
        post.Comments.splice(commentIndex , 1);
        await post.save();
        res.json({
            message:"Comment deleted"
        })
    } else{
        return res.status(400).json({
            message:"You are not authorized to delete this comment"
        })
    }
})

export const editCaption = TryCatch(async(req , res)=>{
    const post = await Post.findById(req.params.id);

    if(!post){
        return res.status(404).json({
            message:"No post with this id",
        })
    }

    if(post.owner.toString() !== req.user._id.toString()){
        return res.status(400).json({
            message:"You are not owner of this post " , 
        })
    }

    post.caption = req.body.caption;

    await post.save();

    res.json({
        message:"Caption updated"
    })
})