const expressServer = require('express');
// import app from './app.ts';
const connectToDB = require('./configs/db.ts');
const appServer = require("./app.ts");

const port = process.env.PORT || 9001;

connectToDB.connectDB();

appServer.get('/', (req, res) => res.send('Hello  111!'));


appServer.listen(port, () => console.log(`Server running on port ${port}`));
