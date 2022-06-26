const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    posterName:{
        type: String,
        default: null
    },
    image:{
        type: String,
        default: null
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String
    },
    expiryDate: {
        type: Date,
        default: null
    },
    likes:{
        type: Number,
        default : 0
    }
}, { timestamps: true });

module.exports = mongoose.model("post", postSchema);