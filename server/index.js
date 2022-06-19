require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongooseDB = require("./db");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const PORT = process.env.PORT;

//connect to mongoDB
mongooseDB();

//cross-site & json parsing middleware
app.use(cors());
app.use(express.json());

//routing
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/post/", postRoute);

app.get("/", (req, res) => {
    res.send("API home");
})

//start server
app.listen(Number(PORT), (err) => {
    if (err) console.log("Couldn't connect to server")
    console.log(`server listening at port: ${PORT}`);
})