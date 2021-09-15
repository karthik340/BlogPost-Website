const BlogPost=require('../models/BlogPost.js')
const path=require('path')
module.exports = async(req,res)=>{
    let image=req.files.image
    image.mv(path.resolve('.','public/img',image.name),async(error)=>{
        console.log(error)
        const a =await BlogPost.create({...req.body,
        image:'/img/'+image.name,
        userid: req.session.userId
        })
        
        res.redirect('/')
    })
}