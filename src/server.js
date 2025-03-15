const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const connection = require('../config/database');
const routes = require('./routes/index.js');

require('dotenv').config();

const port = process.env.PORT;

const host = process.env.HOST_NAME;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//     res.send('Server is running!');
// });

app.get('/', routes);

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});