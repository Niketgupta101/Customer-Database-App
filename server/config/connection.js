const mongoose = require('mongoose');

require('dotenv').config();

const mongouri = process.env.MONGO_URI;

mongoose.connection.on('error', (err) => {
    console.log(`MongoDB connection error: ${err}`);
    process.exit(-1);
})

exports.connect = () => {
    mongoose.connect(mongouri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('mongoDB connected...'));
    return mongoose.connection;
}
