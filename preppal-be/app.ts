const expressApp = require("express");
const cors = require("cors");
const app = expressApp();

app.use(cors());
app.use(expressApp.json());

// defined paths
const authApi = require("./routes/authApi.ts");
const userApi = require("./routes/userApi.ts");
const recipeApi = require("./routes/recipeApi.ts");
const reviewApi = require("./routes/reviewApi.ts");
const calendarApi = require("./routes/calendarApi.ts");

// defined apis
app.get("/", (req, res) => res.send("App is running"));
app.use("/api/auth", authApi);
app.use("/api/users", userApi);
app.use("/api/recipes", recipeApi);
app.use("/api/reviews", reviewApi);
app.use("/api/calendar", calendarApi);

module.exports = app;
