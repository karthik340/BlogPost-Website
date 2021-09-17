const flash=require('connect-flash')
module.exports = (req,res)=>{
    const errors = req.flash('validationErrors') 
        var username = "" 
        var password = ""
        var data = flash('data')[0]
        if(typeof data != "undefined")
        {
                title = data.username
                body = data.password
        }
    res.render('login',{
    errors:errors,
    username:username,
    password:password
})
}