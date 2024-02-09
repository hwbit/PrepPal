const express = require('express');
const connectToDB = require('./configs/db.ts');
const app = express();

const port = process.env.PORT || 9001;

connectToDB.connectDB();

app.get('/', (req, res) => res.send('Hello world!'));

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
