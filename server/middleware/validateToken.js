const jwt = require('jsonwebtoken');


async function validateToken(req, res, next) {
    //console.log(req.cookies)
    const token = req.cookies['access_token'];

    if(!token) return res.status(401).send('You are not signed in');

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if(err) return res.status(400).send('Token is invalid');

        // we add userId and isSeller properties to the request
        req.userId = payload.id;
        req.isSeller = payload.isSeller;

        next(); // we proceed to the next function after validateToken
    });
}

module.exports = { validateToken };