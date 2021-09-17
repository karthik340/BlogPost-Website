const flash=require('connect-flash')
module.exports = (req,res,next)=>{
    if(req.files==null)
    {
        errors=[]
        
        if(req.body.title=="")
        {
            errors.push("please provide title")
        }
        if(req.body.body=="")
        {
            errors.push("please provide body")
        }
        errors.push("please provide image")
        req.flash('data',req.body)
        req.flash('validationErrors',errors)
        errors=[]
        return res.redirect("/posts/new")
    }
    next()
}