const express = require("express");
const router = express.Router();
const Test = require("../models/test.js");

router.get("/", async (req, res) => {
    try {
        const tests = await Test.find();
        res.json(tests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;