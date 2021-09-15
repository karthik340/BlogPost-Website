const express = require('express')
const app = new express()
const ejs=require('ejs')
const expressSession = require('express-session')
app.use(expressSession({
    secret:'keyboard cat',
    resave:true,
    saveUninitialized:true
}))
const flash = require('connect-flash')
app.use(flash())
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://karthik:smellofvictory@cluster1.24njb.mongodb.net/test',{useNewUrlParser:true})
const schema=mongoose.Schema;
app.set('view engine','ejs')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//to access files property from request
const fileUpload= require('express-fileupload')
app.use(fileUpload())

global.loggedIn=null
app.use('*',(req,res,next)=>{
        loggedIn=req.session.userId;
        next()
})

 
const validateMiddleWare = require('./middleware/validateMiddleware')
app.use('/posts/store',validateMiddleWare)

const authMiddleware = require('./middleware/authMiddlware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const newPostController = require('./controllers/newPost')
const searchPostController = require('./controllers/searchPost')
const storePostController = require('./controllers/storePost')
const getPostIdController = require('./controllers/getPostId')
const viewPostsController = require('./controllers/home')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginValidateController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')
let port = process.env.PORT
if(port==null||port=="")
{
    port=4000
}
app.listen(port, ()=>{
console.log('App listening ')
})
app.get('/',viewPostsController)
app.get('/post/:id',getPostIdController)
app.get('/posts/new',authMiddleware,newPostController)
app.get('/search',searchPostController)
app.post('/posts/store',authMiddleware,storePostController)
app.get('/auth/register',redirectIfAuthenticatedMiddleware,newUserController)
app.post('/users/register',storeUserController)
app.get('/auth/login',redirectIfAuthenticatedMiddleware,loginController)
app.post('/users/login',loginValidateController)
app.get('/auth/logout',logoutController)
app.use((req,res)=>{
    return res.render('notfound')
})