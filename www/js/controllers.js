var starterCtrls = angular.module('starter.controllers', []);

//'ngAutocomplete'

starterCtrls.service('appService', function($http, Doctappbknd) {
    var service = this,
        route = '/person/';
    function getUrl(path){
        return Doctappbknd.tableUrl + path;
    };
    service.all = function (param){
        return $http.get(getUrl(route));
    };
    service.getById = function(value){
      return $http.get(getUrl(route+value));
    }    
    service.save = function(param){
      return $http.post(getUrl(route), param );
    };

    service.update = function(value, param){
      return $http.put(getUrl(route+value), param );
    };

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
                saveUser(data.app_user_id);

               /*
               var alertPopup = $ionicPopup.alert({   title: 'Verificação do Smartphone',
                                                     template: 'Smartphone verificado com sucesso!' });              
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
          console.log(result.data);          
          if(result.data){
              window.localStorage['userId'] = result.data._id;
              var alertPopup = $ionicPopup.alert({title: 'Verificação do Smartphone',
                                               template: 'Smartphone verificado com sucesso!' });                          
              $state.go('app.profile'); 
              window.location.reload();
          }else{
              alertPopup = $ionicPopup.alert({title: 'Alerta',
                                           template: 'Falha ao salvar seu Usuário'});
              // -------------- OBS -----------------
              //Criar meio para gerar usuario no banco, caso o mesmo tenha sido validado com sucesso.
          }              
      });
  }

})

starterCtrls.controller('ProfileCtrl', function($scope, $stateParams) {
  $scope.user = {  '_id': window.localStorage['userId'],
                  'name': window.localStorage['name'],
              'lastname': window.localStorage['lastname'],    
          'healthCareId': window.localStorage['healthCareId'],
              //'birthday': window.localStorage['birthday'],
                'userId': window.localStorage['cellphoneNumber']};   

  $scope.updateById = function(){

    window.localStorage['name']         = $scope.user.name;
    window.localStorage['lastname']     = $scope.user.lastname;
    window.localStorage['birthday']     = $scope.user.birthday;
    window.localStorage['healthCareId'] = $scope.user.healthCareId;

    console.log($scope.user);
    /*appService.update($scope.user.userId, $scope.user)
      .then(function(result){
            //do something
            console.log(result.data);
      });*/
  }

})

starterCtrls.controller('cityCtrl', function($scope, $stateParams) {
   /* Config para utilização do Autocomplete das cidades. */
  $scope.result2 = '';
  $scope.options2 = { country: 'br',
                        types: '(cities)'};   
  $scope.details2 = '';
})







// ';' apenas no final de todos os metodos :) 

//.controller('SchedulesCtrl', function($scope, $stateParams){});
