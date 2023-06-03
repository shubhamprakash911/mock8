const express= require("express");
const { postModel } = require("../model/post.model");
const postRouter= express.Router();


// get posts
postRouter.get("/",async (req,res)=>{
    const {filter,sort,search,pageNumber} = req.query
    const query={};
    if(filter)query.category=filter;
    if(search)query.name= {$regex:search,$options:"i"};


    try {
        const postData=await postModel.find(query).sort(`${sort?{date:sort}:{}}`).skip((pageNumber-1)*4).limit(4)
        res.send({
            status:true,
            data:postData
        })
    } catch (error) {
        console.log(error.message)
    }
})


// create posts
postRouter.post("/create",async (req,res)=>{
    try {
        const postData=await new postModel(req.body).save();
        res.send({
            status:true,
            data:postData,
            message:"post created successfully"
        })
    } catch (error) {
        console.log(error.message)
    }
})


//delete post
postRouter.delete("/delete/:id",async (req,res)=>{
    try {
        const postData=await postModel.findByIdAndDelete({_id:req.params.id})
        res.send({
            status:true,
            data:postData,
            message:"post deleted successfully"
        })
    } catch (error) {
        console.log(error.message)
    }
})

//edit post
postRouter.patch("/update/:id",async (req,res)=>{
    try {
        const postData=await postModel.findByIdAndUpdate({_id:req.params.id})
        res.send({
            status:true,
            data:postData,
            message:"post updated successfully"
        })
    } catch (error) {
        console.log(error.message)
    }
})


module.exports={postRouter}