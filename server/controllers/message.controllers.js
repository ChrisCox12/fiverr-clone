const Message = require('../models/message');
const Conversation = require('../models/conversation');
const User = require('../models/user.model');

async function createMessage(req, res) {
    const{ userId, body, isSeller } = req;

    try {
        const user = await User.findById(userId);

        if(!user) return res.send('Can\'t create message');

        const newMessage = await Message.create({
            conversationId: body.conversationId,
            userId: userId,
            userImage: user.image,
            text: body.text
        });

        await Conversation.findOneAndUpdate(
            { id: body.conversationId }, 
            {
                $set: {
                    readBySeller: isSeller,
                    readByBuyer: !isSeller,
                    lastMessage: body.text
                }
            },
            { new: true }
        );

        res.status(201).send(newMessage);
    } catch (error) {
        res.status(500).send('Something went wrong');
    }
}

async function getMessages(req, res) {
    const { id } = req.params;

    try {
        const messages = await Message.find({ conversationId: id });

        res.status(200).send(messages);
    } catch (error) {
        res.status(500).send('Something went wrong');
    }
}


module.exports = {
    createMessage,
    getMessages
}