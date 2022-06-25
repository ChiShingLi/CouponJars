const router = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user")
const { postValidateSchema } = require("../helpers/postValidateSchema");
const { validateAuth } = require("../middleware/validateAuth");

//get all post, public API
router.get("/", async (req, res) => {
    try {
        const postData = await Post.find();
        res.status(200).json(postData);
    } catch (error) {
        return res.status(500).send({ message: "Internal server error." });
    }
})

//create new post
router.post("/", validateAuth, async (req, res) => {
    try {
        const userData = await User.findById(req.decoded._id) //refetch user's data
        const reqObj = await postValidateSchema.validateAsync({ ...req.body, poster: userData._id, posterName: userData.displayName });
        await new Post({ ...reqObj, poster: userData._id }).save();
        return res.status(201).send({ message: "Post created successfully." })
    } catch (error) {
        return res.status(500).send({ message: "Internal server error." });
    }
});

//like post
router.patch("/like", validateAuth, async (req, res) => {
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
});

module.exports = router;