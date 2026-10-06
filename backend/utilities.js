const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    //console.log(req);
    //console.log('Incoming Headers:', req.headers);
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ error: "Invalid authorization format" });
    }

    const token = parts[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };
