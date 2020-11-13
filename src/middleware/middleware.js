const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config/config');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.Authorization || null;
    try {
        const token = authHeader.split(' ')[1];
        const user = jwt.verify(token, TOKEN_SECRET);
        req.user = user;
        return next();
    } catch (error) {
        return res.sendStatus(401);
    }
}

const authenticateTokenOrNull = (req, res, next) => {
    const authHeader = req.headers.Authorization || null;
    try {
        const token = authHeader.split(' ')[1];
        const user = jwt.verify(token, TOKEN_SECRET);
        req.user = user;
        return next();
    } catch (error) {
        req.user = null;
        return next();
    }
}

module.exports = {
    authenticateToken,
    authenticateTokenOrNull
};