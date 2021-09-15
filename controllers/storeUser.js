const User = require('../models/User')
module.exports = (req,res)=>{
    User.create(req.body,(error,user)=>{
        if(error)
        {
            const validationErrors = Object.keys(error.errors).map(keys=>error.errors[keys].message)
            req.flash('validationErrors',validationErrors)
            req.flash('data',req.body)
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
}