const mongoose = require("mongoose");

// DB module
function DbConnection() {
    mongoose.connect(process.env.DB_PATH)
        .then((res) => {
            console.log("DB connection successful.")
        }).catch((err) => {
            console.log(`Error connecting to the database: ${err}`);
        })
}
module.exports = DbConnection