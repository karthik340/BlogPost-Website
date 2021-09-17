const BlogPost=require('../models/BlogPost.js')
const path=require('path')
const flash = require('connect-flash')
module.exports = async(req,res)=>{
    let image=req.files.image
    image.mv(path.resolve('.','public/img',image.name),async(error)=>{
        try{
        const a =await BlogPost.create({...req.body,
        image:'/img/'+image.name,
        userid: req.session.userId
        })
        console.log('ram')
         }
         catch(error){
            console.log('disk')
            const validationErrors = Object.keys(error.errors).map(keys=>error.errors[keys].message)
            req.flash('validationErrors',validationErrors)
            req.flash('data',req.body)
            res.redirect('/posts/new')
         }
         console.log('hello')
         return res.redirect('/')
    })
}