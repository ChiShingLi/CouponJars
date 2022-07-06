const { postValidateSchema } = require("../helpers/postValidateSchema");

const Post = require("../models/post");
const User = require("../models/user")

//get all post controller
exports.posts_get_all_post = async (req, res) => {
    try {
        const postData = await Post.find();
        res.status(200).json(postData);
    } catch (error) {
        return res.status(500).send({ message: "Internal server error." });
    }
};

//get a single post controller
exports.posts_get_single_post = async (req, res) => {
    try {
        const postData = await Post.findById(req.query.postId);
        if (postData) {
            return res.status(200).json(postData);
        }
        return res.status(404).send({ message: "The requested resource was not found." });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error." });
    }
};

//create post controller
exports.posts_create_new_post = async (req, res) => {
    try {
        const userData = await User.findById(req.decoded._id) //refetch user's data
        const reqObj = await postValidateSchema.validateAsync({ ...req.body, poster: userData._id, posterName: userData.displayName });
        await new Post({ ...reqObj, poster: userData._id }).save();
        return res.status(201).send({ message: "Post created successfully." })
    } catch (error) {
        return res.status(500).send({ message: "Internal server error." });
    }
};

//like post controller
exports.posts_like_post = async (req, res) => {
    try {
        //get post Id
        const postId = req.body.postId;
        await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });

        //update user likes, by pushing the post Id to the user like's array
        const userData = req.decoded;
        await User.findByIdAndUpdate(userData._id, { $push: { likes: { post_id: postId } } });
        return res.status(201).send({ message: "Post liked successfully." })

    } catch (error) {
        return res.status(500).send({ message: "Internal server error." });
    }
}

//comment post controller
exports.posts_comment_post = async (req, res) => {
    try {
        const userData = req.decoded;
        //get post Id
        const postId = req.body.postId;
        let value = await Post.findByIdAndUpdate(postId, { $push: { comments: { posterId: userData._id, displayName: userData.displayName, comment: req.body.comment, date: new Date() } } });

        //found
        if (value == null) {
            return res.status(500).send({ message: "Internal server error." });
        }
        return res.status(201).send({ message: "commented successfully." })
    } catch (error) {
        return res.status(500).send({ message: "Internal server error." });
    }
};