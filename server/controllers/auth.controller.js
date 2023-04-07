const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    const { body } = req;
    //console.log(body)
    try {
        const hashedPass = await bcrypt.hash(body.password, 10);
        const newUser = await User.create({
            ...body,
            password: hashedPass
        });

        //console.log(newUser);
        console.log('new user created')
        //res.status(201).send(newUser);

        const token = jwt.sign({
            id: newUser._id,
            isSeller: newUser.isSeller
        }, process.env.JWT_SECRET);

        const { password, ...rest } = newUser._doc;

        // we store the token in cookies under the name access_token, and flag it to only be accessible by the web server
        res
            .cookie('access_token', token, {
                httpOnly: true
            })
            .status(200)
            .send(rest);
    } 
    catch(error) {
        res.status(501).send('Something went wrong');
    }
}

async function login(req, res) {
    const { body } = req;

    try {
        const user = await User.findOne({ username: body.username });

        if(!user) return res.status(404).send('User not found');
        
        const isMatch = await bcrypt.compare(body.password, user.password);

        if(!isMatch) return res.status(400).send('Invalid credentials');
        
        const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller
        }, process.env.JWT_SECRET);

        const { password, ...rest } = user._doc; // the data that we want to send is inside the _doc portion of the object,
                                                 // so we destructure the password from that data and send the rest
        //console.log(token)
        
        // we store the token in cookies under the name access_token, and flag it to only be accessible by the web server
        res
            .cookie('access_token', token, { 
                httpOnly: true, 
                //sameSite: 'None', 
                //secure: true 
            }) 
            .status(200)
            .send(rest);
    } 
    catch(error) {
        res.status(500).send('Something went wrong');
    }
}

async function logout(req, res) {
    res
        .clearCookie('access_token', {
            sameSite: 'None', // a security option to help defend mitigiate CSRF attacks.
                              // for our purposes, we want to implicitly state that the cookie is being used in a third-party context
                              // More info at: https://web.dev/samesite-cookies-explained/
            secure: true // this marks the cookied to be used with HTTPS only;
                         // must be set to true if sameSite attribue is set to None
        })
        .status(200)
        .send('You have been logged out');
}


module.exports = {
    register, 
    login,
    logout
};