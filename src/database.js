const mongoose = require('mongoose');

const {NODEJS_PRACT_HOST, NODEJS_PRACT_DATABASE} = process.env;
const MONGO_URI = `mongodb://${NODEJS_PRACT_HOST}/${NODEJS_PRACT_DATABASE}`;

mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(db=> console.log('Database is connected'))
    .catch(err => console.log(err));