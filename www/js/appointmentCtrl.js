var appointmentCtrl = angular.module('AppointmentCtrl', []);
//var appointmentCtrl = angular.module('AppointmentCtrl', ['doctorsCtrl']);
appointmentCtrl.factory('appointmentVO', function(){
  var appointmentVO            = {};  
      appointmentVO.doctorId       = "";
      appointmentVO.doctorName     = "";
      appointmentVO.specialityId   = 0;
      appointmentVO.specialityDesc = "";
      appointmentVO.perIni     = '';
      appointmentVO.perEnd     = '';
      appointmentVO.monthIni   = 0;
      appointmentVO.monthEnd   = 0; 
      appointmentVO.convenioId = 0;

  return appointmentVO;
})

doctorsCtrl.factory('ScheduleFactory', function(){
  var scheduleObj      = {}
      scheduleObj.List = [];

  scheduleObj.getList = function (){
    return scheduleObj.List;
  }
  scheduleObj.addList = function (list){
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
    service.mene = function (param){
        return $http.get(getUrl('/mene/'+param));
    };
    /*service.all = function (param){
        return $http.get(getUrl(route), {
            params: { param }
        });
    };*/
    service.allBySpeCity = function(param){
        var docRoute = '/doctorsByIds/' + param;                
        return $http.get(getUrl(docRoute));
    };
    
    service.save = function(param){
      return $http.post(getUrl('/appointment/'), param );
    };
    service.getById = function(param){
      return $http.get(getUrl(route+param));
    }
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
  service.hide = function(){
    $ionicLoading.hide();
  };

})
//DoctorFactory
appointmentCtrl.controller('newAppointmentCtrl', function($scope, $ionicModal, $ionicPopup, $state, appointmentVO, ScheduleFactory, ScheduleService, LoadingService) {
  
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
  // Triggered in the login modal to close it
  $scope.closeZoom = function(zoomId) {
    switch(zoomId){
      case "dz":
        $scope.docZmodal.hide();      
        //console.log(zoomId);
        break;  
      /*case "ct":
        $scope.cityZmodal.hide();
        //console.log(zoomId);
        break;*/
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
  $scope.clearForm = function(){
    $scope.appointmentVO ={};
    appointmentVO = $scope.appointmentVO;
  }
  /**
   Chama tela de disponibilidade de horarios de acordo com os parametros introduzidos na tela de Nova Consulta
   **/
  $scope.goToVerify = function(comeFrom) {

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
      var params = appointmentVO.specialityId + ';0';
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
appointmentCtrl.controller('SchedulesCtrl', function($scope, $ionicPopup, ScheduleService) {

  $scope.ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];
  
  $scope.avalueteDoctor = function() {
      var avaluateOperation = $ionicPopup.confirm({title: 'Confirmar Avaliação?',
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
    var cancelOperation = $ionicPopup.confirm({title: 'Consulta não realizada?',
                                            template: 'Ao clicar nesta opção a consulta será marcada como não realizada! Continuar?',
                                          cancelText: 'Não',
                                              okText: 'Sim',
                                          cancelType: 'button-assertive',
                                              okType: 'button-calm'});
        cancelOperation.then(function(res) {
      
        });
  };  

  $scope.cancelAppointment = function() {
    var cancelOperation = $ionicPopup.confirm({title: 'Cancelar consulta?',
                                            template: 'Ao clicar nesta opção a consulta será cancelada, liberando o horário na agenda do médico para outro paciente! Confirmar Cancelamento?', 
                                          cancelText: 'Não',
                                              okText: 'Sim',
                                          cancelType: 'button-assertive',
                                              okType: 'button-calm'});     
      cancelOperation.then(function(res) {
      
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
            $scope.schedules = result.data;          
          }else{
            alertPopup = $ionicPopup.alert({title: 'Informações',
                                         template: 'Você não nenhuma consulta agendada.'  });
          }          
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



