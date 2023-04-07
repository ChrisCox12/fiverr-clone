const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const gigRoutes = require('./routes/gig.routes');
const reviewRoutes = require('./routes/review.routes');
const orderRoutes = require('./routes/order.routes');
const conversationRoutes = require('./routes/conversation.routes');
const messagesRoutes = require('./routes/message.routes');

app.use(cors({ credentials: true, origin:'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messagesRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});


module.exports = app;