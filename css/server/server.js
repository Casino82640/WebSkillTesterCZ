const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });

const { MONGO_URI, JWT_SECRET } = process.env;
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "../..")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../index.html"));
});

// Fail fast with a clear message instead of a cryptic crash later.
if (!MONGO_URI) {
    console.error("Missing MONGO_URI in server/.env");
    process.exit(1);
}
if (!JWT_SECRET) {
    console.error("Missing JWT_SECRET in server/.env (used to sign login tokens)");
    process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error:", err.message));

app.get("/", (req, res) => {
    res.send("WebSkill Tester API works");
});

app.use("/api/tests", require("./routes/tests"));
app.use("/api/users", require("./routes/users"));
app.use("/api/results", require("./routes/results"));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
