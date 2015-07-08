angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
    
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

.controller('SigninCtrl', function($scope, $stateParams) {

})



.controller('SchedulesCtrl', function($scope, $ionicPopup) {

  $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];


  /*$scope.avaluateDoctor = function() { 
    var avaluateOperation = $ionicPopup.confirm({
    /*template: '<input type="password">',
    title: 'Avaliar Médico',
    scope: $scope,
     buttons: [{text: 'Cancel'},
               {text: 'Save'}]
    )}
  }*/

   $scope.avalueteDoctor = function() {
    var avaluateOperation = $ionicPopup.confirm({
        title: 'Confirmar Avaliação?',
        subTitle: 'Atribua a quantiade de estrelas ao médico conforme o atendimento recebido:',
        template: '<h3><rating ng-model="rate" max="5" readonly="false" on-hover="null" on-leave="overStar = null"></h3>', 
        cancelText: 'Cancelar',
        okText: 'Sim',
        cancelType: 'button-assertive',
        okType: 'button-calm'});
      avaluateOperation.then(function(res) {
      
   });
  };  
 

  $scope.appointmentDoNotRealized = function() {
    var cancelOperation = $ionicPopup.confirm({
        title: 'Consulta não realizada?',
        template: 'Ao clicar nesta opção a consulta será marcada como não realizada! Continuar?', 
        cancelText: 'Não',
        okText: 'Sim',
        cancelType: 'button-assertive',
        okType: 'button-calm'});
     
   cancelOperation.then(function(res) {
      
   });
  };  

  $scope.cancelAppointment = function() {
    var cancelOperation = $ionicPopup.confirm({
        title: 'Cancelar consulta?',
        template: 'Ao clicar nesta opção a consulta será cancelada, liberando o horário na agenda do médico para outro paciente! Confirmar Cancelamento?', 
        cancelText: 'Não',
        okText: 'Sim',
        cancelType: 'button-assertive',
        okType: 'button-calm'});
     
   cancelOperation.then(function(res) {
      
   });
  };  
  
   
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

    $scope.schedules = [
       {epeciality: 'Pisiquiatria', doctor: 'Rodolfo Pipe Variani Mussato', date: 'Segunda, 03/07/2015' , hour: '14:30', id: 1 },  
       {epeciality: 'Gastro', doctor: 'Mauricio Faoro',  date: 'Quinta , 10/08/2015' , hour: '14:30', id: 2 },
       {epeciality: 'Clinico', doctor: 'Marcelo Menegat',  date: 'Segunda, 08/08/2015' , hour: '14:30', id: 3}  
    ];

})






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
