const jwt = require("jsonwebtoken");

isValidAuth = (token) => {
    try {
        jwt.verify(token, process.env.SECRET_KEY);
        //return back decoded user
        return true
    } catch (error) {
        return false;
    }
}

function validateAuth(req, res, next) {
    //get the header's Bearer token
    try {
        const token = req.header("authorization").split(" ")[1];
        const isValid = isValidAuth(token);
        if (isValid !== null) {
            console.log("valid auth")
            next();
            return;
        } else {
            console.log("invalid auth")
            res.send("error")
        }
    } catch (error) {
        res.send("ERROR getting token")
    }

}

module.exports = { validateAuth };