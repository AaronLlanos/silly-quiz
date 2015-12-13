angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('QuizzesCtrl', function($scope) {
  $scope.quizzes = [
    { title: 'What car are you?', id: 1 }
  ];
})

.controller('QuizCtrl', function($scope, $stateParams, $http, $ionicModal) {
  // To hold the quiz and all of its questions/
  $scope.quiz = {};
  $scope.currentQuestion = {};
  $scope.answer = {};
  $scope.userAnswers = [];

  // Create the answer modal that we will use later
  $ionicModal.fromTemplateUrl('templates/quiz-answer.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $http.get('quizzes/cars.'+$stateParams.quizId+'.json')
    .success(function (data){
      // console.log(data);
      $scope.quiz = data;
      $scope.questionIndex = 0;
      $scope.currentQuestion = $scope.quiz.questions[$scope.questionIndex];
    });
  $scope.nextQuestion = function (id){
    $scope.questionIndex += 1;
    $scope.userAnswers.push(id);
    if($scope.questionIndex === $scope.quiz.questions.length){
      // Calculate the answer
      $scope.answer = $scope.quiz.answers[$scope.userAnswers[0]];
      $scope.showAnswer();
    }else{
      $scope.currentQuestion = $scope.quiz.questions[$scope.questionIndex];
    }
  };
  $scope.showAnswer = function (){
    $scope.modal.show();
  };
  $scope.closeModal = function (){
    $scope.questionIndex = 0;
    $scope.userAnswers = [];
    $scope.currentQuestion = $scope.quiz.questions[$scope.questionIndex];
    $scope.modal.hide();
  };
});
