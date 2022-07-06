const router = require("express").Router();
const { validateAuth } = require("../middleware/validateAuth");
const UserController = require("../controllers/user");

//GET - get current user
router.get("/", validateAuth, UserController.users_get_current_user);

//POST - signup
router.post("/signup", UserController.users_signup);

//POST - login
router.post("/login", UserController.users_login);

//PATCH - change password
router.patch("/changePassword", validateAuth, UserController.users_change_password);

//PATCH - Change display name
router.patch("/changeName", validateAuth, UserController.users_change_display_name);

module.exports = router;