const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function testRoute(req, res) {
    res.send('User routes works');
}

async function getUser(req, res) {
    const { id } = req.params;
    //console.log(id);

    try {
        const user = await User.findById(id);

        if(!user) return res.status(404).send('User not found');
        
        const { password, email, phoneNumber, ...rest } = user._doc;

        res.status(200).send(rest);
    } 
    catch(error) {
        res.status(500).send('Something went wrong');
    }
}

async function createUser(req, res) {
    
}

async function loginUser(req, res) {

}

async function deleteUser(req, res) {
    const token = req.cookies
    const user = await User.findById(req.params.id);
    //console.log(token)
    //console.log(`req.userId: ${req.userId}\nreq.isSeller: ${req.isSeller},\nuser._id: ${user._id}`)
    // for comparison, we convert _id to a string because it is a MongoDB ObjectId
    if(req.userId !== user._id.toString()) return res.status(403).send('You can only delete you own account') ;

    await User.findByIdAndDelete(req.params.id);
    res.status(200).send('Account deleted');
}



module.exports = { 
    testRoute,
    createUser,
    loginUser,
    deleteUser,
    getUser
};