const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    displayName:{
        type: String,
        default: null
    },
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