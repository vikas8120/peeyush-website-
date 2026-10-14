const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json("No access");

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(403).json("Invalid token");
    }
};
