var starterCtrls = angular.module('starter.controllers', ['ngAutocomplete']);

starterCtrls.service('appService', function($http, Doctappbknd) {
    var service = this,
        route = '/person/';
    function getUrl(path){
        return Doctappbknd.tableUrl + path;
    };
    service.all = function (param){
        return $http.get(getUrl(route));
    };    
    service.save = function(param){
      return $http.post(getUrl(route), param );
    };
    service.getById = function(param){
      return $http.get(getUrl(route+param));
    }
})

starterCtrls.controller('AppCtrl', function($scope, $ionicPopup, $http, $injector, $ionicLoading, appService) {
  var $state = $injector.get('$state');
  var appID = '098a8991aefd43f08e8ad8b';
  var appToken = '86bda5c58db34bbf9e560cbf59ecf799a20b1307';


  $scope.show = function(message) {
    $ionicLoading.show({
      template: message
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };

  $scope.cellphoneNumber = '';
  $scope.cellphoneNumberValidation = window.localStorage['cellphoneNumber'] ;
  $scope.doctorAppNumber = window.localStorage['otp_start'] + 'XXXXX';
  $scope.code = '';

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
     $scope.show('Validando Informações...');
     url = 'https://www.cognalys.com/api/v1/otp/confirm/?app_id=' + appID
         + '&access_token=' + appToken
         + '&keymatch=' + window.localStorage['keymatch'] 
         + '&otp=' + window.localStorage['otp_start'] + code;

     $http.get(url).
        success(function(data, status, headers, config) {
          $scope.hide();
         if (data.status == 'fajiled'){
            var alertPopup = $ionicPopup.alert({
               title: 'Verificação do Smartphone',
               template: 'Codigo de validação informado está incorreto!' });   
             } else{
               var alertPopup = $ionicPopup.alert({
               title: 'Verificação do Smartphone',
               template: 'Smartphone verificado com sucesso!' });
               //window.localStorage['app_user_id'] = data.app_user_id;
               saveUser(data.app_user_id);

               /*
               window.localStorage['verifiedNumber'] = 'yes';   
               $state.go('app.profile'); 
               window.location.reload();
               */
            }
         }).
         error(function(data, status, headers, config) {
           $scope.hide();
           var alertPopup = $ionicPopup.alert({
               title: 'Verificação do Smartphone',
               template: 'Ocorreu algum erro na comunicação com o servidor. Tente novamente' });
         });
 }

  $scope.recieveNewCall = function() {
    $scope.show('Realizando Chamada...');
    var mobile = '+55' +  window.localStorage['cellphoneNumber'] ;
    var url = 'https://www.cognalys.com/api/v1/otp/?app_id=' + appID
            + '&access_token=' + appToken
            + '&mobile=' + mobile;

    $http.get(url).
    success(function(data, status, headers, config) {
      $scope.hide();
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
      $scope.hide();
      var alertPopup = $ionicPopup.alert({
               title: 'Verificação do Smartphone',
               template: 'Ocorreu algum erro na comunicação com o servidor. Tente novamente' });
    });        

  }
  
  $scope.changeMyNumber = function() {
    $state.go('app.newUser'); 
  }
  
  $scope.validateNumber = function(cellphoneNumber) {

    $scope.show('Validando Informações...');

    var mobile = '+55' + cellphoneNumber;
    var url = 'https://www.cognalys.com/api/v1/otp/?app_id=' + appID
            + '&access_token=' + appToken
            + '&mobile=' + mobile;

    $http.get(url).
    success(function(data, status, headers, config) {
      $scope.hide();
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
      $scope.hide();
      var alertPopup = $ionicPopup.alert({
               title: 'Verificação do Smartphone',
               template: 'Ocorreu algum erro na comunicação com o servidor. Tente novamente' });
    });

  } //Validate Number


  function saveUser(userId){
      window.localStorage['verifiedNumber'] = 'yes';   
      var user = {'name': '',
              'lastname': '',                  
                'userId': window.localStorage['cellphoneNumber'], //Celular usuario/ID Medico  
             'verfifyID': userId};

      appService.save(user)
        .then(function(result){
          if(result.data > 0){
              window.localStorage['userId'] = result.data._id;       
              $state.go('app.profile'); 
              window.location.reload();
          }else{
              alertPopup = $ionicPopup.alert({title: 'Alerta',
                                           template: 'Falha ao salvar seu Usuário'  });
          }              
      });
  }

})

starterCtrls.controller('ProfileCtrl', function($scope, $stateParams) {
  $scope.cellphoneNumber = window.localStorage['cellphoneNumber'] ;


})

starterCtrls.controller('cityCtrl', function($scope, $stateParams) {
   /* Config para utilização do Autocomplete das cidades. */
  $scope.result2 = '';
  $scope.options2 = { country: 'br',
                        types: '(cities)'};   
  $scope.details2 = '';
})


starterCtrls.controller('hisotryCtrl', function($scope, $ionicPopup){

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

  $scope.schedule = [];
  $scope.schedule[0]  = {
     freeDay : 1,
     freeTime : []
  };
  $scope.schedule[0].freeTime.push("14:30");
  $scope.schedule[0].freeTime.push("15:30");
  $scope.schedule[0].freeTime.push("16:30");

  $scope.schedule[1]  = {
     freeDay : 8,
     freeTime : []
  };
  $scope.schedule[1].freeTime.push("08:30");
  $scope.schedule[1].freeTime.push("09:30");

  $scope.schedule[2]  = {
     freeDay : 15,
     freeTime : []
  };
  $scope.schedule[2].freeTime.push("08:50");
  $scope.schedule[2].freeTime.push("09:40");
 


   $scope.toggleGroup = function(day) {
    if ($scope.isGroupShown(day)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = day;
    }
  };
  $scope.isGroupShown = function(day) {
    return $scope.shownGroup === day;
  };
  


});




// ';' apenas no final de todos os metodos :) 

//.controller('SchedulesCtrl', function($scope, $stateParams){});
