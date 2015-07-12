angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicPopup, $http) {

  $scope.validateNumber = function() {

    var appID = '098a8991aefd43f08e8ad8b';
    var appToken = 'b23389d0d504aa1243de6593721a65f4f6bf8adc';
    var mobile = '+55' + document.getElementById('txtCellphone').value;
    var url = 'https://www.cognalys.com/api/v1/otp/?app_id=' + appID
            + '&access_token=' + appToken
            + '&mobile=' + mobile;

    $http.get(url).
    success(function(data, status, headers, config) {
      if (data.status == 'failed'){
         var alertPopup = $ionicPopup.alert({
             title: 'Verificação do Smartphone',
             template: 'Número informado inválido:' + data.mobile
          });
      } else {
          var alertPopup = $ionicPopup.alert({
             title: 'Verificação do Smartphone',
             template: 'Você recebeu uma ligação do número:' + data.otp_start + 'XXXXX. Informe os últimos cinco digitos para validar seu cadastro!' +
                       '<input type="text"  id="txtCode">'
          });
          alertPopup.then(function(res) {
           url = 'https://www.cognalys.com/api/v1/otp/confirm/?app_id=' + appID
               + '&access_token=' + appToken
               + '&keymatch=' + data.keymatch
               + '&otp=' + data.otp_start + document.getElementById('txtCode').value;

           $http.get(url).
            success(function(data, status, headers, config) {
              if (data.status == 'failed'){
               var alertPopup = $ionicPopup.alert({
               title: 'Verificação do Smartphone',
               template: 'Codigo de validação informado está incorreto!' });   
              } else{
               var alertPopup = $ionicPopup.alert({
               title: 'Verificação do Smartphone',
               template: 'Smartphone verificado com sucesso!' });   
               }

            }).
            error(function(data, status, headers, config) {
            });
         });
      }
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      alert('nok');
    });

  }
  
})

.controller('LoginCtrl', function($scope, $state) {
// Form data for the login modal
  $scope.loginData = {};
  $scope.goToSignIn = function() {
    $state.go('app.signin'); 
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


   $scope.avalueteDoctor = function() {
    var avaluateOperation = $ionicPopup.confirm({
        title: 'Confirmar Avaliação?',
        subTitle: 'Atribua a quantiade de estrelas ao médico conforme o atendimento recebido:',
        template: '<h1><rating ng-model="rate" max="5" readonly="false" on-hover="null" on-leave="overStar = null"></h1>', 
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
