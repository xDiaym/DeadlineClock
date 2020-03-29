'use strict';
const config = require('./config.json');
const express = require('express');
const path = require('path');

const port = process.env.port || 5000;
const deadline = getDeadlineUnixTime(config);

const app = express();
const route = express.Router();


app.use('/static', express.static(__dirname + '/static'));

function getDeadlineUnixTime(json) {
    return Math.floor(new Date(json.year,
        json.month,
        json.day,
        json.hour || 0,
        json.minute || 0,
        json.second || 0
    ).getTime() / 1000);
}

route.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/templates/index.html'));
});

route.get('/time', (req, res) => {
    res.json({ deadline: deadline });
});


app.use('/', route);
app.listen(port, () => {
    console.log(`App running on port ${port}!`);
});
