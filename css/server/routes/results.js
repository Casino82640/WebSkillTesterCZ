const express = require("express");
const router = express.Router();

const Result = require("../models/result.js");

router.post("/", async (req, res) => {

    try {

        const result = new Result(req.body);

        await result.save();

        res.json(result);

    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;