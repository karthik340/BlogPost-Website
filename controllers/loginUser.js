const bcrypt = require('bcrypt')
const Users = require('../models/User')
const flash = require('connect-flash')
const { error } = require('npmlog')
module.exports = (req,res)=>{
    req.flash('data',req.body)
    errors=[]
    const {username,password} = req.body
    if(username=="")
    {
        errors.push('please enter username')
    }
    if(password=="")
    {
        errors.push('please enter password')
    }
    if(errors.length>0)
    {
        req.flash('validationErrors',errors)
        errors=[]
        return res.redirect('/auth/login')
    }
    Users.findOne({username:username},(error,user)=>{
        if(user)
        {
            bcrypt.compare(password,user.password,(error,same)=>{
                if(same)
                {
                    req.session.userId=user._id
                    return res.redirect('/')
                }
                else
                {
                    errors.push("invalid password")
                    req.flash('validationErrors',errors)
                    errors=[]
                    return res.redirect('/auth/login')
                }
            })
        }
        else
        {
            errors.push("invalid username")
            req.flash('validationErrors',errors)
            errors=[]
           return res.redirect('/auth/login')
        }
    })
}