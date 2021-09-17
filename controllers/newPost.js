const flash=require('connect-flash')
module.exports = (req,res)=>{
        const errors = req.flash('validationErrors') 
        var title = "" 
        var body = ""
        var data = flash('data')[0]
        if(typeof data != "undefined")
        {
                title = data.title
                body = data.body
        }
        res.render('create',{
                createPost:true,
                errors:errors,
                title:title,
                body:body
        })
}