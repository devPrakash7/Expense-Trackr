const express = require('express')
const app = express()
const port =process.env.PORT || 8000
const dotenv = require("dotenv")
dotenv.config({path:'./config.env'});
const mongoose = require("mongoose")
const cors = require("cors");


//middleware
app.use(express.json());
app.use(cors());
app.use(require("./router/rout"))



// monngodn connection
 mongoose.connect('mongodb://localhost:27017/ExpenseTracker', {
  useNewUrlParser: true 
}).then(() =>{

    console.log("connection sucessfully");

}).catch(() =>{

    console.log("no connected");
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))