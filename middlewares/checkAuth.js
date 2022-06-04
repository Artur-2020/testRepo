const jwt = require("jsonwebtoken");
const {notAuthorized} = require('../constants');

module.exports = (req, res, next) => {
    try {
        if (!req.headers.authorization) throw new Error();
        const decoded = jwt.verify(req.headers.authorization, process.env.SECRET)
        req.user = decoded;
        console.log(req.user);
        next();

    } catch (e) {
        return res.status(401).send(notAuthorized);
    }
};