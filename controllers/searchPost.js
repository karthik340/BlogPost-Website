const BlogPost=require('../models/BlogPost.js')
module.exports=async(req,res)=>{
    var name=req.query.name
    const blogposts = await BlogPost.find({title: {$regex: name} })
    res.render('index',{blogposts}) 
}