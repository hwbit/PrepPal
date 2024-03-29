const expressServer = require("express");
const connectToDB = require("./configs/db.ts");
const appServer = require("./app.ts");

const port = process.env.PORT || 8080;

connectToDB.connectDB();

appServer.get("/", (req, res) => res.send("Hello  111!"));

appServer.listen(port, () => console.log(`Server running on port ${port}`));
