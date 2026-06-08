const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../index.html"));
});

app.use(express.static(path.join(__dirname, "../../")));

const testRoutes = require("./routes/tests");

app.use("/api/tests", testRoutes);

const userRoutes = require("./routes/users");

app.use("/api/users", userRoutes);

const resultRoutes = require("./routes/results");

app.use("/api/results", resultRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
