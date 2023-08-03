const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_KEY = '1@3$5^7*9)-+';

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({error : "Please authenticate using a valid token."});
    }
    try {
        const data = jwt.verify(token, ACCESS_TOKEN_KEY);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({error : "Please authenticate using a valid token."});
    }
}

module.exports = fetchuser;