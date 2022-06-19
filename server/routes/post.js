const router = require("express").Router();
const Post = require("../models/post");
const { postValidateSchema } = require("../helpers/postValidateSchema");
const { validateAuth } = require("../middleware/validateAuth");

router.post("/", validateAuth, async (req, res) => {
    try {
        const userData = req.decoded;
        const reqObj = await postValidateSchema.validateAsync({ ...req.body, poster: userData._id });
        await new Post({ ...reqObj, poster: userData._id }).save();
        return res.status(201).send({ message: "Post created successfully." })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal server error." });
    }
});

module.exports = router;