const router = require("express").Router();
const { validateAuth } = require("../middleware/validateAuth");
const PostController = require("../controllers/post");

//GET - get all post, public API
router.get("/", PostController.posts_get_all_post);

//POST - create new post
router.post("/", validateAuth, PostController.posts_create_new_post);

//GET - get single post, public API
router.get("/getPost", PostController.posts_get_single_post);

//PATCH - like post
router.patch("/like", validateAuth, PostController.posts_like_post);

//PATCH - comment post
router.patch("/comment", validateAuth, PostController.posts_comment_post);

module.exports = router;