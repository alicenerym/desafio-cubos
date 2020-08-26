// Loading modules
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Configure
    //body Parser
        app.use(bodyParser.urlencoded({extended:false}));
        app.use(bodyParser.json());

//Routes
require('./src/routes/createUser')(app);
app.listen(3000, ()=>{
    console.log("Sever is working in PORT 3000");
});