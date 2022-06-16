require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongooseDB = require("./db");

const PORT = process.env.PORT;

//connect to mongoDB
mongooseDB();

//cross-site & json parsing middleware
app.use(cors());
app.use(express.json); 
 
app.get("/", (req, res) => {
    res.send("API home");
})

//start server
app.listen(PORT || 3002, (err) => {
    if (err) console.log("Error starting up server");
    console.log(`server started at port: ${PORT}`);
})
