const router = require("express").Router();
const jwt = require("jsonwebtoken");

//check if token is valid
isValidAuth = (token) => {
    try {
        jwt.verify(token, process.env.SECRET_KEY);
        return true;
    } catch (error) {
        return false;
    }
}

//check if user token is valid
router.get("/isValidAuth", (req, res) => {
    try {
        //extract the token from header
        if (req.header("authorization") !== "" || req.header("authorization") !== null) {
            const token = req.header("authorization").split(" ")[1];
            const isValid = isValidAuth(token);
            res.status(200).send(isValid)
        } else {
            res.status(500).send({ message: "Error checking for auth" })
        }
    } catch (error) {
        res.status(500).send({ message: "Error checking for auth" })
    }
})

module.exports = router;