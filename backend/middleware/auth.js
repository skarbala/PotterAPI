let jwt = require('jsonwebtoken');
module.exports = checkToken;

function checkToken(req, res, next) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.status(403);
            res.send(err);
        } else {
            next();
        }
    })
}

