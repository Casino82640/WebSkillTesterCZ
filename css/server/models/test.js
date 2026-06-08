const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctAnswer: String
});

const testSchema = new mongoose.Schema({
    title: String,
    topic: String,
    difficulty: String,
    questions: [questionSchema]
});

module.exports = mongoose.model("Test", testSchema, "Tests");