const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
const port = 3000
//use express router
app.use('/',require('./routes/index'))
//set up view engine
app.set('view engine','ejs');
app.set('views','./views')
app.listen(port,(err)=>{
    if(err){
        console.log("Error:",err)
    } 
    console.log("Server running on port:",port)

})