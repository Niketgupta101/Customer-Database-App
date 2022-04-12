const app = require('./config/express.js');
const mongoose = require('./config/connection.js');

// configuring dotenv
require('dotenv').config();

// establishing mongoose connection
mongoose.connect();

const port = 5000 || process.env.PORT;

// listening to port
app.listen(port, () => {
    console.log(`server started on port ${port}`);
})

module.exports = app;