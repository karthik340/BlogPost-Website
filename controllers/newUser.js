const flash = require('connect-flash')
module.exports = (req,res)=>{
    var username=""
    var password=""
    const errors = req.flash('validationErrors')
    const data = req.flash('data')[0]
    if(typeof data != "undefined")
    {
        username=data.username
        password=data.password
    }
    
    return res.render('register',{
        errors: errors,
        username: username,
        password: password
    })
}