/**
 * The Index of Routes
 */

module.exports = function (app) {

    // The quiz route
    app.use('/quiz', require('./routes/quiz'));
}