const { object } = require("joi");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    likes:[
       {type: Object}
    ]
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);
