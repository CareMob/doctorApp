angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
  
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
  }).then(function($ionicModal) {
    $scope.modal = $ionicModal;
    
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

$scope.goToSignIn = function() {
    $scope.closeLogin();
    $state.go('app.signin'); 
  };  


  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

  
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})



.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {

})

<<<<<<< HEAD
.controller('SchedulesCtrl', function($scope) {
  // chamada banco
=======
.controller('SigninCtrl', function($scope, $stateParams) {

})



.controller('SchedulesCtrl', function($scope) {

   
   $scope.setHidden = function(type, value){
    currentDate = new Date();
    appointmentDate = new Date(value);
    returnvisible = true;
    
    if ( (appointmentDate < currentDate) && (type == "past")){
        returnvisible = false; }

    if ( (appointmentDate > currentDate) && (type == "future")){
        returnvisible = false; }    

    return returnvisible; 
  }

   // chamada banco

>>>>>>> origin/master
    $scope.schedules = [
       {epeciality: 'Pisiquiatria', doctor: 'Rodolfo Pipe Variani Mussato', date: 'Segunda, 03/07/2015' , hour: '14:30', id: 1 },  
       {epeciality: 'Gastro', doctor: 'Mauricio Faoro',  date: 'Quinta , 10/08/2015' , hour: '14:30', id: 2 },
       {epeciality: 'Clinico', doctor: 'Marcelo Menegat',  date: 'Segunda, 08/08/2015' , hour: '14:30', id: 3}  
    ];
})

/*
.controller('AppointmentCtrl', function($scope, $ionicModal, Data) {

  $scope.data = Data;

  // Form data for the Appointments
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/doctorsZoom.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeZoom = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.doctorZoom = function() {
    $scope.modal.show();
  };
})*/




.controller('hisotryCtrl', function($scope){

  $scope.history = [
     {epeciality: 'Pisiquiatria', doctor: 'Rodolfo Pipe Variani Mussato', date: 'Segunda, 03/08/2015' , hour: '14:30', status: 'Realizada', score: '4', id: 1 },  
     {epeciality: 'Gastro', doctor: 'Mauricio Faoro',  date: 'Quinta , 03/08/2015' , hour: '14:30',  status: 'Cancelada', score: '0', id: 2 },
     {epeciality: 'Clinico', doctor: 'Marcelo Menegat',  date: 'Segunda, 03/08/2015' , hour: '14:30', status: 'Agendada', score: '0', id: 3}  
    ];

  $scope.max = 5;

  $scope.setRate = function(value){
    $scope.rate = value;
  }

  $scope.setHidden = function(value){
    if(value == "Realizada") {return false;}
    else {return true;}    

  }
  $scope.isReadonly = true;


  $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];


});




// ';' apenas no final de todos os metodos :) 

//.controller('SchedulesCtrl', function($scope, $stateParams){});
