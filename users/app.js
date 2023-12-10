const swaggerDocs = require("./utils/swagger.js");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
swaggerDocs(app, 5000);
const cors = require("cors");
app.use(cors());
const mongoUrl = "mongodb+srv://mongo:ais1889117796@cluster0.uahgiie.mongodb.net/?retryWrites=true&w=majority";
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}));
mongoose.connect(mongoUrl,{
    useNewUrlParser:true
}).then(()=>{console.log("Conected to database");
})
.catch(e=>console.log(e));
require("./models/userDetails");
require("./models/filmDetails");
app.use("/",require('./routes/user.Routes'));

app.listen(5000,()=>{
    console.log("Server started");
});