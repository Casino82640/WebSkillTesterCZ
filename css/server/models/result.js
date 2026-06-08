const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test"
    },

    score: Number,

    totalQuestions: Number,

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Result", resultSchema, "Results");