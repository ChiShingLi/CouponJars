const jwt = require("jsonwebtoken");

isValidAuth = (token) => {
    try {
        jwt.verify(token, process.env.SECRET_KEY);
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
            //store decoded data in request
            req.decoded = jwt.decode(token, process.env.SECRET_KEY);

            //valid token
            next();
            return;
        } else {
            //invalid token
            return res.status(401).send({ message: "Unauthorized Token." });
        }
    } catch (error) {
        return res.status(500).send({ message: "Internal authentication server error." });
    }

}

module.exports = { validateAuth };