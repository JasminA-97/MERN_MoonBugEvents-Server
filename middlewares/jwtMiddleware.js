const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    console.log('inside jwtMiddleware');
    
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(404).json("Missing Token!!!");
    }

    const token = authHeader.split(" ")[1];
    console.log(token);

    if (token) {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWT_PASSWORD);
            console.log(jwtResponse);

            req.payload = jwtResponse.userId; // Assuming jwtResponse contains a userId field
            next();
        } catch (err) {
            console.error(err);
            res.status(401).json("Invalid Token... Please Login!!!");
        }
    } else {
        res.status(404).json("Missing Token!!!");
    }
};

module.exports = jwtMiddleware;
