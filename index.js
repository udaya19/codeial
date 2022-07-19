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
const { urlencoded } = require('express');
//use express router
app.use('/',require('./routes/index'))
//Extract styles and scripts from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//set up view engine
app.set('view engine','ejs');
app.set('views','./views')
//Running server
app.listen(port,(err)=>{
    if(err){
        console.log("Error:",err)
    } 
    console.log("Server running on port:",port)

})