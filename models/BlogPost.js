const mongoose = require('mongoose')
const User = require('./User')
const Schema = mongoose.Schema
var uniqueValidator = require('mongoose-unique-validator')
const BlogPostSchema = new Schema({
    title:{
        type: String,
        required:[true,"Please provide title"],
        unique:true
    },
    body:{
        type:String,
        required:[true,"Please provide body"],
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    datePosted:{
        type:Date,
        default:new Date()
    },
    image:String
})
BlogPostSchema.plugin(uniqueValidator)
const BlogPost = mongoose.model('BlogPost',BlogPostSchema)
module.exports = BlogPost