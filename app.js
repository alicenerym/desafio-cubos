// Loading modules
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Configure
    //body Parser
        app.use(bodyParser.urlencoded({extended:false}));
        app.use(bodyParser.json());

//Routes
require('./src/rotas/createUser')(app);
require('./src/rotas/addToLine')(app);
require('./src/rotas/findPosition')(app);
require('./src/rotas/showLine')(app);
require('./src/rotas/popLine')(app);
require('./src/rotas/filterLine')(app);

app.listen(3000, ()=>{
    console.log("Server is working in PORT 3000");
});