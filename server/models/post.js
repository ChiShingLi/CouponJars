const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    category: {
        type: Number
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
    expireDate:{
        type: Date
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("post", postSchema);