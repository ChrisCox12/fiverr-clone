const Conversation = require('../models/conversation');
const User = require('../models/user.model');


async function getConversation(req, res) {
    const { id } = req.params;

    try {
        const convo = await Conversation.findOne({ id: id });

        if(!convo) return res.status(404).send('Conversation not found');

        res.status(200).send(convo);
    }
    catch(error) {
        res.status(500).send('Something went wrong');
    }
}

async function getConversations(req, res) {
    const { isSeller, userId } = req;

    try {
        const convos = await Conversation.find(isSeller ? { sellerId: userId } : { buyerId: userId }).sort({ updatedAt: 'descending' });

        res.status(200).send(convos);
    }
    catch(error) {
        res.status(500).send('Something went wrong');
    }
}


async function createConversation(req, res) {
    const { isSeller, userId, body } = req;

    try {
        const other = await User.findById(body.to);
        const user = await User.findById(userId);

        const newConvo = await Conversation.create({
            id: isSeller ? userId + other._id : other._id + userId,
            sellerId: isSeller ? userId : other._id,
            sellerName: isSeller ? user.username : other.username,
            buyerId: isSeller ? other._id : userId,
            buyerName: isSeller ? other._id : user.username,
            readBySeller: isSeller,
            readByBuyer: !isSeller
        });

        res.status(201).send(newConvo);
    }
    catch(error) {
        res.status(500).send('Something went wrong');
    }
}

async function updateConversation(req, res) {
    const { id } = req.params;
    const { isSeller } = req;

    try {
        const updatedConvo = await Conversation.findOneAndUpdate(
            { id: id }, 
            {
                $set: {
                    readBySeller: isSeller,
                    readByBuyer: !isSeller
                }
            },
            { new: true }
        );

        res.status(200).send(updatedConvo);
    }
    catch(error) {
        res.status(500).send('Something went wrong');
    }
}


module.exports = {
    getConversation,
    getConversations,
    createConversation,
    updateConversation
}