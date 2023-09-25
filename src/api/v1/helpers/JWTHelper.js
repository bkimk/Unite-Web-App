const jwt = require('jsonwebtoken')

const createJWT = (userid) => {
    const payload = {
        userid: userid
    };

    // Create/sign jwt with encrypted user id
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
    );

    const jwtResponse = "Bearer " + token
    return jwtResponse;
}


module.exports = {
    createJWT
}