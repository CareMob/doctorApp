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

    service.update = function(valueId, param){
      return $http.put(getUrl(route+valueId), param );
    };

})

starterCtrls.controller('AppCtrl', function($scope, $ionicPopup, $http, $injector, $ionicLoading, $timeout, appService) {
  var $state = $injector.get('$state');
  var checkmobiUrl = 'https://api.checkmobi.com/v1/';
  var checkmobiKey = '979DEBE2-90E5-4A66-8B61-18140A07DA67';
  $scope.counter = 25;
  var mytimeout = null; 
  
  $scope.onTimeout = function() {
	  if($scope.counter == 0) {
		$scope.hide();
        $scope.$broadcast('timer-stopped', 0);
        $timeout.cancel(mytimeout);
		$scope.hasRecivedCall();
	    return;
     }
	 
	 $scope.showTimer(  'Você receberá uma ligação dentro de alguns instantes...<br/>'
	                 + '<b>Não Atenda</b> a ligação. Apenas aguarde:' ,  $scope.counter);
	 
     $scope.counter--;   
	  	  
     mytimeout = $timeout($scope.onTimeout, 1000);
   };
      
   
   $scope.startTimer = function() {
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    // stops and resets the current timer
    $scope.stopTimer = function() {
        $scope.$broadcast('timer-stopped', $scope.counter);
        $scope.counter = 25;
        $timeout.cancel(mytimeout);
    };
    // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
    $scope.$on('timer-stopped', function(event, remaining) {
        if(remaining === 0) {
            console.log('your time ran out!');
        }

    }); 
	
  $scope.hasRecivedCall = function(){
     var call = $ionicPopup.confirm({title: 'Validação do Smartphone',
                                  template: 'A chamada foi recebida com sucesso?',
                                    okText: 'Sim',
							    cancelText: 'Não',
                                    okType: 'button-calm',
								cancelType: 'button-assertive' });
     call.then(function(res) {
		 if (res == false){
						 
			 var alertPopup = $ionicPopup.alert({
                              title: 'Verificação do Smartphone',
			 template: 'Será enviado um SMS com código de verificação para seu smartphone!'});
			 $scope.checkNumberBySms();
		 }
     });
        
  }	
	
  $scope.showTimer = function(message, timer) {
	message = message + '<h2>' + timer + '(s)<\h2>';
	$ionicLoading.show({
      template: message
    });
  };
  

  $scope.show = function(message) {
	message = message;
	  
	$ionicLoading.show({
      template: message
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };

  $scope.cellphoneNumber = '';
  $scope.cellphoneNumberValidation = window.localStorage['cellphoneNumber'] ;
  $scope.doctorAppNumber = '0000' + window.localStorage['prefix_checkmobi'] + 'XXXXX';
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

  $scope.getCountry = function (){
	  var url = checkmobiUrl + 'countries';
	  
	   
	  $http.get(url).success(function(data) {
		  
		alert(data[1].name);
	  
	  }).error(function(data) {
           $scope.hide();
           var alertPopup = $ionicPopup.alert({
               title: 'Verificação do Smartphone',
               template: 'Ocorreu algum erro na comunicação com o servidor. Tente novamente' });
         });
  }
  
    $scope.checkNumberBySms = function (){
		
		
		var req = { method: 'POST',
                      url : checkmobiUrl + 'validation/request',
				   headers: {
					        'Content-Type' : 'application/json',
						    'Authorization' : checkmobiKey
				          },
				 data : {   number : '+55' + window.localStorage['cellphoneNumber'],
				            type : 'sms' }
				};
				
				
	 $http(req).then(function(response){
		   if( response.status == 200){
			  window.localStorage['id_checkmobi']     = response.data.id;
			  $state.go('app.validationCode');
		   } else{
			 var alertPopup = $ionicPopup.alert({
                              title: 'Verificação do Smartphone',
			 template: 'Número informado inválido:' + window.localStorage['cellphoneNumber']});
		   }
		}, 
	   function(response){
		   var alertPopup = $ionicPopup.alert({
                     title: 'Verificação do Smartphone',
		   template: 'Ocorreu algum problema de comunicação com o servidor! Certifique-se que está com acesso a internet e tente novamente!'});
	   });			
	}
  

    $scope.checknumber = function (cellphoneNumber){
	
	if ((cellphoneNumber.length < 10) || (cellphoneNumber.length > 11)){
		 var alertPopup = $ionicPopup.alert({
                     title: 'Verificação do Smartphone',
		 template: 'Numero de smartphone informado não é valido. Favor digitar novamente'});
		 return;
	}
	
    $scope.startTimer();
	  
	  var req = { method: 'POST',
                 url : 	checkmobiUrl + 'validation/request',
				 headers: {
					       'Content-Type' : 'application/json',
						   'Authorization' : checkmobiKey
				          },
				 data : {   number : '+55' + cellphoneNumber,
				            type : 'reverse_cli' }
				};
				
	   $http(req).then(function(response){
		   if( response.status == 200){
			  window.localStorage['cellphoneNumber']  = cellphoneNumber;
			  window.localStorage['id_checkmobi']     = response.data.id;
			  window.localStorage['prefix_checkmobi'] = response.data.cli_prefix;
			  $state.go('app.validationCode');
		   } else{
			 var alertPopup = $ionicPopup.alert({
                              title: 'Verificação do Smartphone',
			 template: 'Número informado inválido:' + cellphoneNumber});
		   }
		}, 
	   function(response){
		   var alertPopup = $ionicPopup.alert({
                     title: 'Verificação do Smartphone',
		   template: 'Ocorreu algum problema de comunicação com o servidor! Certifique-se que está com acesso a internet e tente novamente!'});
	   });
	
  }
  
  $scope.validateCode = function(code) {
	 if (code.length != 4) {
		 var alertPopup = $ionicPopup.alert({
                     title: 'Verificação do Smartphone',
	     template: 'Código de validação informado não está no padrão solicitado!'});
		 return;
	 }
	  
     $scope.show('Validando Número... Por favor aguarde!');
	 
	 var req = { method: 'POST',
                 url : 	checkmobiUrl + 'validation/verify',
				 headers: {
					       'Content-Type' : 'application/json',
						   'Authorization' : checkmobiKey
				          },
				 data : {   id : window.localStorage['id_checkmobi'],
				            pin : code }
				};
     
	 $http(req).then(function(response){
		   if( response.status == 200){
			    var alertPopup = $ionicPopup.alert({
				title: 'Verificação do Smartphone',
			   template: 'Smartphone validado com sucesso!'});
			   saveUser(window.localStorage['id_checkmobi']);
			   
		   } else {
			   var alertPopup = $ionicPopup.alert({
				   title: 'Verificação do Smartphone',
			   template: 'Código de validação informado não está correto!'});
			   
		   }
	 }, function(response){
		 alert(response.status);
		   var alertPopup = $ionicPopup.alert({
                     title: 'Verificação do Smartphone',
		   template: 'Ocorreu algum problema de comunicação com o servidor! Certifique-se que está com acesso a internet e tente novamente!'});
	   });
				
     $scope.hide();
 }

  $scope.recieveNewCall = function() {
   $scope.checknumber(window.localStorage['cellphoneNumber']) ;
  }
  
  $scope.changeMyNumber = function() {
    $state.go('app.newUser'); 
  }
  
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

starterCtrls.controller('ProfileCtrl', function($scope, $ionicLoading, $ionicPopup, $stateParams) {

  $scope.hInsuranceList = [{'code': '1', 'name': 'Particular'}, 
                           {'code': '2', 'name': 'Circulo Operário'},
                           {'code': '3', 'name': 'Fátima'},
                           {'code': '4', 'name': 'IPAM'},
                           {'code': '5', 'name': 'Unimed'}];

  $scope.user = {  '_id': window.localStorage['userId'],
                  'name': window.localStorage['name'],
              'lastname': window.localStorage['lastname'],    
          'healthCareId': window.localStorage['healthCareId'],
       'healthInsurance': window.localStorage['healthInsurance'],
              //'birthday': window.localStorage['birthday'],
                'userId': window.localStorage['cellphoneNumber']};   

  $scope.updateById = function(){

    $scope.show("Atualizando Usuário!");

    window.localStorage['name']            = $scope.user.name;
    window.localStorage['lastname']        = $scope.user.lastname;
    window.localStorage['birthday']        = $scope.user.birthday;
    window.localStorage['healthCareId']    = $scope.user.healthCareId;
    window.localStorage['healthInsurance'] = $scope.user.healthInsurance;

    $scope.hide();

    //console.log($scope.user);
    /*var alertPopup = $ionicPopup.alert({
                    title: 'Perfil',
                    template: 'Perfil atualizado com sucesso!' });*/
    appService.update($scope.user.userId, $scope.user)
      .then(function(result){
            //do something
            $scope.hide();
            var alertPopup = $ionicPopup.alert({
                    title: 'Perfil',
                    template: 'Perfil atualizado com sucesso!' });
            //console.log(result.data);
      });
  };
  $scope.show = function(message) {
    $ionicLoading.show({
      template: message
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };





})

// ';' apenas no final de todos os metodos :) 

//.controller('SchedulesCtrl', function($scope, $stateParams){});
