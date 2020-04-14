exports.checkHeader = (req, res, next) => {
    if (!req.is('application/json')) {
        res.status(400).send({ message: "Sorry Nick you dont have HEADer" });
    }
    next();
}