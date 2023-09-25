const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT tokens
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        if (token == null) return res.sendStatus(401)

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedJWT) => {
            if (err) {
                console.log(err)
                return res.sendStatus(403);
            }
            req.user = decodedJWT;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports = {
    authenticateJWT
}