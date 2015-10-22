var appointmentCtrl = angular.module('AppointmentCtrl', []);
//var appointmentCtrl = angular.module('AppointmentCtrl', ['doctorsCtrl']);
appointmentCtrl.factory('appointmentVO', function(){
  var appointmentVO            = {};  
      appointmentVO.doctorId       = "";
      appointmentVO.doctorName     = "";
      appointmentVO.specialityId   = 0;
      appointmentVO.specialityDesc = "";
      appointmentVO.cityId     = 0;
      appointmentVO.cityDesc   = "";
      appointmentVO.perIni     = '';
      appointmentVO.perEnd     = '';
      appointmentVO.monthIni   = 0;
      appointmentVO.monthEnd   = 0; 
      appointmentVO.convenioId = 0;

  return appointmentVO;
})

appointmentCtrl.factory('Appointments', function(){
  var Appointments = {}
      Appointments.data = []; 


  Appointments.getList = function(){
    return Appointments.data;
  }
  Appointments.addList = function(list){
    Appointments.data = list;
  }
  Appointments.delItem = function(hIndex, dIndex){
        //Elimina horario da lista
    Appointments.data[dIndex].scheduleTime.splice(hIndex,1);
    //Verifica se existe algum horario para o dia, caso não elimina o dia da lista tbm.
    if(Appointments.data[dIndex].scheduleTime.length == 0){
      Appointments.data.splice(dIndex, 1);
    }
  }
  return Appointments;
})

doctorsCtrl.factory('ScheduleFactory', function(){
  var scheduleObj      = {}
      scheduleObj.List = [];

  scheduleObj.getList = function (){
    return scheduleObj.List;
  }
  scheduleObj.addList = function(list){
    scheduleObj.List = list;
  }  
  scheduleObj.delList = function (){
    scheduleObj.List = []; //melhorar isso ahahha
  }  
  return scheduleObj; 
})
/* --  --*/
appointmentCtrl.service('ScheduleService', function($http, Doctappbknd) {
    var service = this,
        route = '/schedule/';
    function getUrl(path){
        return Doctappbknd.tableUrl + path;
    };
    service.all = function (param){
        return $http.post(getUrl(route), param);
    };
    service.getById = function(param){
      return $http.get(getUrl(route+param));
    };
    service.getHistoryById = function(param){
      var histRoute = '/scheduleold/' + param;
      return $http.get(getUrl(histRoute));
    };
    
    service.allBySpeCity = function(param){
        var docRoute = '/doctorsByIds/' + param;                
        return $http.get(getUrl(docRoute));
    };
    
    
    service.save = function(param){
      return $http.post(getUrl('/appointment/'), param );
    };
    service.update = function(param){
      return $http.put(getUrl('/appointment/'), param);
    };

    service.mene = function (param){
        return $http.get(getUrl('/mene/'+param));
    };  
    
})

appointmentCtrl.service('LoadingService', function($ionicLoading){
  var service = this;

  //Loading
  service.show = function() {
    $ionicLoading.show({
      //template: '<img src="/img/symbol-loader64.gif"/>' 
      template: 'Buscando Informações...'
    });
  };

  service.refresh = function() {
    $ionicLoading.show({
      //template: '<img src="/img/symbol-loader64.gif"/>' 
      template: 'Atualizando dados'
    });
  };

  service.hide = function(){
    $ionicLoading.hide();
  };

})
//DoctorFactory
appointmentCtrl.controller('newAppointmentCtrl', function($scope, $ionicModal, $ionicPopup, $state, $ionicHistory, appointmentVO, ScheduleFactory, ScheduleService, LoadingService) {
  
  $scope.appointmentVO = appointmentVO;  
  $scope.schdlFreeTime = ScheduleFactory.getList();

  // Form data for the Appointments
  $scope.loginData = {};
  var _ctrl               = this,
      setAppointmentVO    = {};

  /* ----------------------------------------------------------------------------------------- */
  /* ----------------------------------- RATING DEFINITION ----------------------------------- */
  /* ----------------------------------------------------------------------------------------- */
  $scope.max = 5;
  $scope.setRate = function(value){
    $scope.rate = value;
  }
  $scope.setHidden = function(value){
    if(value > 0) {return false;}
    else {return true;}    
  }
  $scope.isReadonly = true;
  $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star',    stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart',   stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];
  /* ----------------------------------------------------------------------------------------- */
  /* --------------------------------- AGRUPADOR ACCORDION ----------------------------------- */
  /* ----------------------------------------------------------------------------------------- */
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
  //Seta horario escolhido para marcar a consulta.
  $scope.setChange = function(hourChk){
    setAppointmentVO._hourId = hourChk._id;
  }
  /* ----------------------------------------------------------------------------------------- */
  /* ----------------------------------- ZOOM DEFINITIONS ------------------------------------ */
  /* ----------------------------------------------------------------------------------------- */
  $ionicModal.fromTemplateUrl('templates/doctorsZoom.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.docZmodal = modal;
  }); 
  $ionicModal.fromTemplateUrl('templates/doctors.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.docLmodal = modal;
  });
  $ionicModal.fromTemplateUrl('templates/specialityZoom.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.specZmodal = modal;
  });
  $ionicModal.fromTemplateUrl('templates/cityZoom.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.cityZmodal = modal;
  });


  // Triggered in the login modal to close it
  $scope.closeZoom = function(zoomId) {
    switch(zoomId){
      case "dz":
        $scope.docZmodal.hide();      
        //console.log(zoomId);
        break;  
      case "ct":
        $scope.cityZmodal.hide();        
        break;
      case "sp":  
        $scope.specZmodal.hide();
        break;
      case "dl":
        $scope.docLmodal.hide();
      default:
        $scope.specZmodal.hide();
        //console.log(zoomId);
        break;
    }    
  };
  // Open the doctors modal
  $scope.doctorZoom = function() {        
    $scope.docZmodal.show();
  };
  // Open the specialities modal
  $scope.specialityZoom = function() {    
    $scope.specZmodal.show();
  };
// Open the specialities modal
  $scope.cityZoom = function() {    
    $scope.cityZmodal.show();
  };

  /* ----------------------------------------------------------------------------------------- */
  /* ----------------------------------------------------------------------------------------- */
  // Set fields on the Appointment form with zoom datas
  $scope.setDoctorChoice = function(doctor) {    
    $scope.appointmentVO.doctorId   = doctor._id;
    $scope.appointmentVO.doctorName = doctor.name + ' ' + doctor.lastname;
  };
  $scope.setSpecChoice = function(speciality){
    $scope.appointmentVO.specialityId   = speciality._id;
    $scope.appointmentVO.specialityDesc = speciality.description;
  };
  $scope.setCityChoice = function(city){
    $scope.appointmentVO.cityId   = city.city_ibge;
    $scope.appointmentVO.cityDesc = city.description + ' - ' + city.state;
  };
  $scope.clearForm = function(){
    $scope.appointmentVO ={};
    appointmentVO = $scope.appointmentVO;
  }

  function verifyData(){
    
    if ((appointmentVO.perIni == "") || (appointmentVO.perEnd == "")){
      var alertPopup = $ionicPopup.alert({
              title: 'Busca Médicos',
              template: 'É obrigatorio a informação do período inicial e final para realização da consulta!'  });   
        return false;
    }
    
    if (appointmentVO.doctorId == ""){
    if ((appointmentVO.specialityId == "") || (appointmentVO.cityId == "")) {
     
     var alertPopup = $ionicPopup.alert({
              title: 'Busca Médicos',
              template: 'É obrigatorio a informação do "medico" ou "especialidade + cidade!"'  });   
       return false;      
    }}
    
    dataInicial = new Date(appointmentVO.perIni);
    dataFinal   = new Date(appointmentVO.perEnd);
    today       = new Date();
    
    if (dataInicial > dataFinal){
      var alertPopup = $ionicPopup.alert({
              title: 'Busca Médicos',
              template: 'Data Final deve ser maior do que a Data Inicial!'  });   
       return false;      
    }
   
    if ((today >= dataInicial)){
       var alertPopup = $ionicPopup.alert({
              title: 'Busca Médicos',
              template: 'Período Inicial deve ser maior do que o dia atual!'  });   
       return false; 
    }
    
      
    return true;
  }
  /**
   Chama tela de disponibilidade de horarios de acordo com os parametros introduzidos na tela de Nova Consulta
   **/
  $scope.goToVerify = function(comeFrom) {

    if (!verifyData()){
      return;
    }

    switch(comeFrom){
      case 'dl':
          //closeZoom('dl');
           $scope.docLmodal.hide();
          break;
      default:
        break;
    }

    //Limpa lista anterior para descartar eventuis 'lixos'
    ScheduleFactory.delList();
    /*var perIni   = getDateApi(appointmentVO.perIni),
        perEnd   = getDateApi(appointmentVO.perEnd),
        urlParam = perIni+'?'+perEnd+'?'+appointmentVO.doctorId;
    console.log(perIni);*/
    
    LoadingService.show();
    //Chama API para verificar horarios disponiveis By Doctor   
    if(appointmentVO.doctorId != ""){
      ScheduleService.all(appointmentVO)      
            .then(function (result) {
              //console.log(result.data);  
              LoadingService.hide();    

              if(result.data.length > 0){
                ScheduleFactory.addList(result.data);              
                //$state.go('app.setAppointment');  
                openAppointmentFree(ScheduleFactory.getList());                    
              }else{
                var alertPopup = $ionicPopup.alert({
                    title: 'Busca horários',
                    template: 'Não existem horários disponiveis para os dados informados.' });
              }
            });
    }else{ //Chama API para verificar horarios disponiveis By Speciality
      var params = appointmentVO.specialityId + ';' + appointmentVO.cityId;
      ScheduleService.allBySpeCity(params)
            .then(function(resultDoc){
                LoadingService.hide(); 
                //Chama tela de medicos.
                //DoctorFactory.addList(result);
                //$state.go('app.doctors');
                console.log(resultDoc.data);
                if(resultDoc.data.length > 0){
                  console.log(resultDoc.data.success);
                  $scope.doctorsList = resultDoc.data;                 
                  $scope.docLmodal.show();
                }else{
                  var alertPopup = $ionicPopup.alert({
                    title: 'Busca Médicos',
                    template: 'Não existem médicos cadastrados para a espcialidade: {{appointmentVO.specialityDesc}} '  });                  
                }
            }); //then
    } //else
     
  };
  // Marca consulta conforme horário selecionado.
  $scope.hitAppoint = function(){
    var alertPopup          = '',
        userId              = window.localStorage['userId'];

    //Menegat : 55e3720e46d781a2480f80e2
    //Caverna : 55c7f83a3edd7aa419da4fc9
    
    //Seta usuario que vai marcar a consulta.
    setAppointmentVO._userId = userId; 

         ScheduleService.save(setAppointmentVO)
            .then(function(result){
              if(result.data){
                console.log(result.data)
                //if(result.data.success){
                  alertPopup = $ionicPopup.alert({
                        title: 'Registro de Consulta',
                        template: 'Consulta agendada com sucesso.' });
						$ionicHistory.nextViewOptions({ disableBack: true });
                        $state.go('app.schedules');
                  //Cav, altera pra pegar o retorno da mensagem "OK" e chamar e tela de 'Meus Horarios'
                /*}else{
                  alertPopup = $ionicPopup.alert({
                        title: 'Registro de Consulta',
                        template: result.data.error  });
                }*/
              }
          });
  }
  // Abre tela com horários livres a escolha
  function openAppointmentFree(scdhlFreeTime) {                
    $scope.appointmentVO = appointmentVO,
    $scope.schdlFreeTime = scdhlFreeTime; 
        //console.log($scope.schdlFreeTime);  
      $state.go('app.setAppointment');
  } //Function

  function getDateApi(dateStamp){
    dateStamp = new Date(dateStamp);
    var date  = dateStamp.getDate(),
        month = appointmentVO.perIni.getMonth() + 1,
        year  = appointmentVO.perIni.getFullYear();          
    if(month < 10)     
        month = 0 +''+ month;

    return date+''+month+''+year;
  }

})
/*------------------------------------------------------------------------------------*/
/*--------------------------- TELA MINHAS CONSULTAS ----------------------------------*/
/*------------------------------------------------------------------------------------*/
appointmentCtrl.controller('SchedulesCtrl', function($scope, $state, $ionicPopup, ScheduleService, Appointments,LoadingService) {
  $scope.statusEnum = {HIT: 0,
          CONFIRMED: 1,
           CANCELED: 2,
           REALIZED: 3,
        NOTREALIZED: 4, 
         props: {
            0: {description: "Marcada",       value: 0, code: "H"},
            1: {description: "Confirmada",    value: 1, code: "C"},
            2: {description: "Cancelada",     value: 2, code: "D"},
            3: {description: "Realizada",     value: 3, code: "R"},
            4: {description: "Não Realizada", value: 4, code: "N"}
          }
  };

  var param = {};
  /* -------------- Status ------------|
  | Cod | Desc          | by who?      |
  |  00 | marcada       | Admin/user   |
  |  01 | Confirmada    | Admin        |
  |  02 | Cancelada     | User         |
  |  03 | Realizada     | User/Admin   | 
  |  04 | Não Realizada | User/Admin   |
  |------------------------------------|*/

  $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];
  
  // Setar como não realizada
  /**
  $scope.appointmentDoNotRealized = function(appointment) {
    
    var cancelOperation = $ionicPopup.confirm({title: 'Consulta não realizada?',
                                            template: 'Ao clicar nesta opção a consulta será marcada como não realizada! Continuar?',
                                          cancelText: 'Não',
                                              okText: 'Sim',
                                          cancelType: 'button-assertive',
                                              okType: 'button-calm'});
        cancelOperation.then(function(res) {
          param = {_hourId: appointment._id,
                   status : 04}; //Nao Realizada

          ScheduleService.update(param)
            .then(function(result){
                console.log(result.data);
            });      
        });
  };
  */

  //Avaliar consulta/Medico
  $scope.avalueteDoctor = function(hIndex, dIndex, appointment) {
      var avaluateOperation = $ionicPopup.confirm({title: 'Confirmar Avaliação?',
                                                subTitle: 'Atribua a quantiade de estrelas ao médico conforme o atendimento recebido:',
                                                template: '<h1><rating ng-model="rate" max="5" readonly="false" on-hover="null" on-leave="overStar = null"></h1>', 
                                              cancelText: 'Cancelar',
                                                  okText: 'Sim',
                                              cancelType: 'button-assertive',
                                                  okType: 'button-calm'});
      avaluateOperation.then(function(res) {        
        LoadingService.refresh();
        param = {_hourId: appointment._id,
                  status: $scope.statusEnum.REALIZED, //Realizada
                  rating: $scope.rate};                
        ScheduleService.update(param)
          .then(function(result){              
              Appointments.delItem(hIndex, dIndex);
              LoadingService.hide();
        });
        
      });
  };  
 
 // Cancelamento de consulta
  $scope.cancelAppointment = function(hIndex, dIndex, appointment) {
    var cancelOperation = $ionicPopup.confirm({title: 'Cancelar consulta?',
                                            template: 'Ao clicar nesta opção a consulta será cancelada, liberando o horário na agenda do médico para outro paciente! Confirmar Cancelamento?', 
                                          cancelText: 'Não',
                                              okText: 'Sim',
                                          cancelType: 'button-assertive',
                                              okType: 'button-calm'});     
      cancelOperation.then(function(res) {

        LoadingService.refresh();
        param = {_hourId: appointment._id,
                 status : $scope.statusEnum.CANCELED}; //cancelada
       // debugger;

        //Elimina horario da lista
        /*Appointments.data[dIndex].scheduleTime.splice(hIndex,1);
        //Verifica se existe algum horario para o dia, caso não elimina o dia da lista tbm.
        if(Appointments.data[dIndex].scheduleTime.length == 0){
          Appointments.data.splice(dIndex, 1);
        }*/
        ScheduleService.update(param)
          .then(function(result){
              $state.go($state.current, {}, {reload: true});
              Appointments.delItem(hIndex, dIndex);
              LoadingService.hide();
        });

      });
  };  
  
   
  $scope.setHidden = function(type, value){
      var currentDate     = new Date();
          appointmentDate = new Date(value);
          returnvisible   = true;      
      if ( (appointmentDate < currentDate) && (type == "past")){
          returnvisible = false; 
      }
      if ( (appointmentDate > currentDate) && (type == "future")){
          returnvisible = false; 
      }    
      return returnvisible; 
  }

   // chamada banco
   $scope.getAppointments = function(){
    //Menegat : 55e3720e46d781a2480f80e2
    //Caverna : 55c7f83a3edd7aa419da4fc9
    var userId = window.localStorage['userId'];
      //Pegar ID do localStorage
      ScheduleService.getById(userId)
        .then(function(result){          
          if(result.data.length > 0){
            Appointments.addList(result.data); 
            $scope.schedules     = Appointments.getList(); // result.data;          
            //console.log(Appointments.getList());
          }else{
            alertPopup = $ionicPopup.alert({title: 'Informações',
                                         template: 'Você não nenhuma consulta agendada.'  });
          }          
      }).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
      });      
   }   

})

starterCtrls.controller('hisotryCtrl', function($scope, $ionicPopup, ScheduleService){

  $scope.statusEnum = {HIT: 0,
          CONFIRMED: 1,
           CANCELED: 2,
           REALIZED: 3,
        NOTREALIZED: 4, 
         props: {
            0: {description: "Marcada",       value: 0, code: "H"},
            1: {description: "Confirmada",    value: 1, code: "C"},
            2: {description: "Cancelada",     value: 2, code: "D"},
            3: {description: "Realizada",     value: 3, code: "R"},
            4: {description: "Não Realizada", value: 4, code: "N"}
          }
  };
   
  $scope.max = 5;

  $scope.setRate = function(value){
    $scope.rate = value;
  }
  $scope.setHidden = function(value){
    if(value != 2 || value != 4) {return false;}
    else {return true;}    

  }
  $scope.toggleGroup = function(day) {
    if ($scope.isGroupShown(day)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = day;
    }
  }
  $scope.isGroupShown = function(day) {
    return $scope.shownGroup === day;
  }

  $scope.isReadonly = true;

  $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];

  $scope.getHistory = function(){
    //Menegat : 55e3720e46d781a2480f80e2
    //Caverna : 55c7f83a3edd7aa419da4fc9
    var userId = window.localStorage['userId'];
      //Pegar ID do localStorage
      ScheduleService.getHistoryById(userId)
        .then(function(result){          
          if(result.data.length > 0){
            $scope.history = result.data;            
          }else{
            alertPopup = $ionicPopup.alert({title: 'Informações',
                                         template: 'Você não nenhuma consultas em histórico.'  });
          }          
      }).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
      });      
   }

});

/*
appointmentCtrl.controller('setAppointmentCtrl', function($scope, $ionicPopup, appointmentVO, ScheduleFactory, ScheduleService ) {

  $scope.appointmentVO     = appointmentVO;
  $scope.schdlFreeTime     = ScheduleFactory;
  var setAppointmentVO     = {},
      alertPopup           = '';

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
  //Seta horario escolhido para marcar a consulta.
  $scope.setChange = function(hourChk){
    setAppointmentVO._hourId = hourChk._id;
  }

  $scope.hitAppoint = function(){
    //Seta usuario que vai marcar a consulta.
    setAppointmentVO._userId = '55e3720e46d781a2480f80e2'; //Fixo Marcelo Menegat, pegar do storagelocal

     ScheduleService.save(setAppointmentVO)
        .then(function(result){
          if(result.data){
            if(result.data.success){
              alertPopup = $ionicPopup.alert({
                    title: 'Registro de Consulta',
                    template: 'Consulta agendada com sucesso.' });
              //Cav, altera pra pegar o retorno da mensagem "OK" e chamar e tela de 'Meus Horarios'
            }else{
              alertPopup = $ionicPopup.alert({
                    title: 'Registro de Consulta',
                    template: result.data.error  });
            }
          }
      });
  }

});*/



