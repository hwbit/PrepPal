// import express from "express";
const expressApp = require('express');
// import cors from "cors";
const cors = require("cors");
const app = expressApp();

app.use(cors());

// defined paths
const userApi = require('./routes/userApi.ts');

// defined apis
app.get("/", (req, res) =>  res.send("App is running"));
app.use('/api/users', userApi);

module.exports = app;
