const express = require('express');
const connectToDB = require('./configs/db.ts');
const app = express();

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 9001;

connectToDB.connectDB();

app.listen(port, () => console.log(`Server running on port ${port}`));
