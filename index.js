const express = require('express');
const cookieParser = require('cookie-parser');
const saasMiddleware = require('node-sass-middleware');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
//setup chatserver to use with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("Chat server is listening on port 5000");

app.use(saasMiddleware({
    src:"./assests/scss",
    dest:"./assests/css",
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
}))
app.use(expressLayouts);
app.use(express.static('./assests'));
app.use(express.urlencoded());
app.use(cookieParser());
//make uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));
const port = 3000
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-outh2-strategy');
const MongoStore = require('connect-mongo');
//Extract styles and scripts from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//set up view engine
app.set('view engine','ejs');
app.set('views','./views');
//mongostore is used to store the session cookie in the db
app.use(session({
    name:'Codeial',
    secret:"hello",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({//storing cookies in db so that whenever server restarts cookies won't get destroyed 
        mongoUrl:'mongodb://localhost/codeial_development',
        autoRemove:'disabled'
    })

}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash())
app.use(customMware.setFlash)
//use express routerz
app.use('/',require('./routes/index'))
//Running server
app.listen(port,(err)=>{
    if(err){
        console.log("Error:",err)
    } 
    console.log("Server running on port:",port)
})