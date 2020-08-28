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
require('./src/routes/addToLine')(app);
require('./src/routes/findPosition')(app);
require('./src/routes/showLine')(app);
app.listen(3000, ()=>{
    console.log("Sever is working in PORT 3000");
});