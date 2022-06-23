const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { userValidateSchema } = require("../helpers/userValidateSchema");
const { validateAuth } = require("../middleware/validateAuth");
const user = require("../models/user");

//POST - signup
router.post("/signup", async (req, res) => {
    try {
        //validate requests
        const reqObj = await userValidateSchema.validateAsync(req.body);

        //check and see if user already exists
        const user = await User.findOne({ email: reqObj.email });
        if (user) {
            return res.status(409).send({ message: "User already exists." })
        }

        //hash password and create new user
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await new User({ ...reqObj, password: hashedPassword }).save();
        return res.status(201).send({ message: "User created successfully." })

    } catch (error) {
        return res.status(500).send({ message: "Internal server error." });
    }
});


// POST - login
router.post("/login", async (req, res) => {
    try {
        const reqObj = req.body;
        //check if user exists
        const user = await User.findOne({ email: reqObj.email });
        if (user) {
            //compare input with hashed password
            const match = await bcrypt.compare(reqObj.password, user.password);
            if (match) {
                //sucessfully matched, send back jwt token for localstorage
                const token = jwt.sign(user.toJSON(), process.env.SECRET_KEY);
                return res.status(200).send({ token: token });
            } else {
                return res.status(401).send({ message: "Incorrect email or password." })
            }
        } else {
            return res.status(401).send({ message: "Incorrect email or password." })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal server error." });
    }
});

//PATCH - change password
router.patch("/changePassword", validateAuth, async (req, res) => {
    try {
        //check if user tries to use the same password
        if(req.body.currentPassword === req.body.newPassword) return res.status(500).send({ message: "Internal server error." });
        
        //find the user by id and compare their password with the hashed version from the db
        const userObj = await User.findById(req.decoded._id);
        const isPasswordMatch = await bcrypt.compare(req.body.currentPassword, userObj.password);
        if (isPasswordMatch) {
            //rehash the new password
            const newPassword = await bcrypt.hash(req.body.newPassword, 10);
            await User.findByIdAndUpdate(req.decoded._id, { $set: { password: newPassword } });
            return res.status(200).send({ message: "Password updated successfully." })
        } else {
            return res.status(401).send({ message: "Incorrect email or password." })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal server error." });
    }
});

module.exports = router;