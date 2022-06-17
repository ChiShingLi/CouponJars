const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { userValidateSchema } = require("../helpers/userValidateSchema");

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

})

module.exports = router;