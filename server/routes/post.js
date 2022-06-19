const router = require("express").Router();
const Post = require("../models/post");
const { validateAuth } = require("../middleware/validateAuth");

router.get("/", validateAuth, (req, res) => {
    res.send("testing POST")
});

module.exports = router;