var express = require('express');
var basicAuth = require('express-basic-auth');
let jwt = require('jsonwebtoken');
var boolParser = require('express-query-boolean');


module.exports = verifyToken;
var app = express();
const port = 3000

app.use(express.json())
app.use(boolParser());


const spellRoute = require('./routes/spells.js');
app.use('/spells', spellRoute);

const houseRoute = require('./routes/houses.js');
app.use('/houses', houseRoute);

const characterRoute = require('./routes/characters.js');
app.use('/characters', characterRoute)

const sortingHatRoute = require('./routes/sortinghat.js');
app.use('/sortingHat', sortingHatRoute);

app.get('/login', basicAuth({
    users: { 'admin': 'supersecret' },
}), (req, res) => {
    const user = {
        username: 'furboslav',
        id: 5,
    }
    generateToken(user, res);
});

generateToken = function (user, res) {
    jwt.sign({ user: user }, 'secretkey', (err, token) => {
        res.json({
            token: token
        });
    });
}

function verifyToken(req, res, next) {
    const bearerHeader = req.header('Authorization');
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else {
        res.status(403)
        res.json({
            message: "vajcia"
        });
    }
}

app.listen(port, () => console.log(`Harry Potter App listening on port ${port}!`))

