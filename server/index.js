require('dotenv/config');
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;


mongoose
    .connect(DB_CONNECTION_STRING)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}, http://localhost:${PORT}`);
        });
    })
    .catch(err => console.log(err));
