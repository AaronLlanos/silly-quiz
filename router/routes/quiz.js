// Include Express
var express = require('express');
// Initialize the Router
var router = express.Router();
var moment = require('moment');
var color = require('cli-color');
var db = require('../../database');
var Quiz = db.quiz;

router.post('/', function (req, res) {
	var body = req.body;
	var time = moment().format('MMMM Do YYYY, h:mm:ss a');

	//Save the quiz in the system and email notification!!!!!!
	console.log('Saving quiz at ' + color.green(time));
    console.log(body);
    // setup the new user
    var newQuiz = new Quiz({
        email: body.email,
        ans0: body.ans0,
        ans1: body.ans1,
        ans2: body.ans2,
        date: new Date()
    });

    newQuiz.save (function (err) {
    	if (err) {
    		console.log('Problem saving quiz by user: ' + color.red(body.email) + ' With the error: ' + color.red(err));
    		res.status(500).json({
                'success': false,
                'message': 'Database error trying to leave quiz.  Please notify Aaron Llanos!.'
            });
    	}else{
            console.log('Successfully saved quiz at ' + color.green(time));
            res.status(200).json({
                'success': true,
                'message': 'Successfully left quiz! Thank you!'
            });
        }

    });

});

module.exports = router;