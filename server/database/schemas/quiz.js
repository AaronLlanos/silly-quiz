/**
 * Our Schema for Feedback
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the Feedback Schema
var quizSchema = new Schema({
    email: { type: String, required: false},
    ans0: { type: Number, required: true },
    ans1: { type: Number, required: true },
    ans2: { type: Number, required: true },
    date: { type: Date, required: true }
});

// The primary Quiz model
var Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;