const express = require('express');
const app = express();
const port = 3000
//use express router
app.use('/',require('./routes/index'))

app.listen(port,(err)=>{
    if(err){
        console.log("Error:",err)
    } 
    console.log("Server running on port:",port)

})