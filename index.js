const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.use(express.static('./assests'));
app.use(express.urlencoded());
app.use(cookieParser());
const port = 3000
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const { urlencoded } = require('express');
//Extract styles and scripts from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//set up view engine
app.set('view engine','ejs');
app.set('views','./views')
app.use(session({
    name:'Codeial',
    secret:"hello",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//use express routerz
app.use('/',require('./routes/index'))
//Running server
app.listen(port,(err)=>{
    if(err){
        console.log("Error:",err)
    } 
    console.log("Server running on port:",port)

})