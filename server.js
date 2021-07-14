// dependencies
const express = require('express');
const mongoose = require('mongoose');

// express config
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// mongoose config
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/ping-social',
    {
        userFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

mongoose.set('debug', true);

// routes config
app.use(require('./routes'));

app.listen(PORT, () => console.log('Connected on localhost:${PORT}'));