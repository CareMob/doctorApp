angular.module('starter.controllers', ['ngAutocomplete'])



.controller('AppCtrl', function($scope, $ionicPopup, $http, $injector) {
  var $state = $injector.get('$state');
  var appID = '098a8991aefd43f08e8ad8b';
  var appToken = '86bda5c58db34bbf9e560cbf59ecf799a20b1307';

  $scope.cellphoneNumber = '';
  $scope.cellphoneNumberValidation = window.localStorage['cellphoneNumber'] ;
  $scope.doctorAppNumber = window.localStorage['otp_start'] + 'XXXXX';
  $scope.code = '';

//window.localStorage['verifiedNumber'] = 'no';
   
  if (window.localStorage['verifiedNumber'] == 'yes'){
   $scope.isLogged = true; 
  } else {$scope.isLogged = false; }

  $scope.loggedItems = [
  {
    label: 'Meus Horários',
    target: '#/app/schedules'
  },
  {
    label: 'Nova Consulta',
    target: '#/app/appointment'
  },
  {
    label: 'Histórico',
    target: '#/app/history'
  },
  {
    label: 'Perfil',
    target: '#/app/profile'
  },
];
  
  $scope.validateCode = function(code) {
     url = 'https://www.cognalys.com/api/v1/otp/confirm/?app_id=' + appID
         + '&access_token=' + appToken
         + '&keymatch=' + window.localStorage['keymatch'] 
         + '&otp=' + window.localStorage['otp_start'] + code;

     $http.get(url).
        success(function(data, status, headers, config) {
         if (data.status == 'fajiled'){
            var alertPopup = $ionicPopup.alert({
               title: 'Verificação do Smartphone',
               template: 'Codigo de validação informado está incorreto!' });   
             } else{
               var alertPopup = $ionicPopup.alert({
               title: 'Verificação do Smartphone',
               template: 'Smartphone verificado com sucesso!' });
               window.localStorage['verifiedNumber'] = 'yes';   
               $state.go('app.profile'); 
               window.location.reload();
            }
         }).
         error(function(data, status, headers, config) {
           var alertPopup = $ionicPopup.alert({
               title: 'Verificação do Smartphone',
               template: 'Ocorreu algum erro na comunicação com o servidor. Tente novamente' });
         });
 }

  $scope.recieveNewCall = function() {
    var mobile = '+55' +  window.localStorage['cellphoneNumber'] ;
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
          window.localStorage['otp_start'] = data.otp_start;
          window.localStorage['keymatch'] = data.keymatch;
          $scope.doctorAppNumber = window.localStorage['otp_start'] + 'XXXXX';

           var alertPopup = $ionicPopup.alert({
             title: 'Verificação do Smartphone',
             template: 'Foi realizada uma nova ligação para seu número!' + data.mobile
          });
      }
    }).
    error(function(data, status, headers, config) {
      var alertPopup = $ionicPopup.alert({
               title: 'Verificação do Smartphone',
               template: 'Ocorreu algum erro na comunicação com o servidor. Tente novamente' });
    });        

  }
  
  $scope.changeMyNumber = function() {
    $state.go('app.newUser'); 
  }
  
  $scope.validateNumber = function(cellphoneNumber) {

    
    var mobile = '+55' + cellphoneNumber;
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
          window.localStorage['cellphoneNumber'] =  cellphoneNumber;
          window.localStorage['otp_start'] = data.otp_start;
          window.localStorage['keymatch'] = data.keymatch;
          $state.go('app.validationCode');
      }
    }).
    error(function(data, status, headers, config) {
      var alertPopup = $ionicPopup.alert({
               title: 'Verificação do Smartphone',
               template: 'Ocorreu algum erro na comunicação com o servidor. Tente novamente' });
    });

  }

})


.controller('ProfileCtrl', function($scope, $stateParams) {
  $scope.cellphoneNumber = window.localStorage['cellphoneNumber'] ;


})


.controller('cityCtrl', function($scope, $stateParams) {
   /* Config para utilização do Autocomplete das cidades. */
  $scope.result2 = '';
  $scope.options2 = { country: 'br',
                    types: '(cities)'};   
  $scope.details2 = '';



  


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
