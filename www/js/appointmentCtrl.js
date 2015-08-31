var appointmentCtrl = angular.module('AppointmentCtrl', []);
//var appointmentCtrl = angular.module('AppointmentCtrl', ['doctorsCtrl']);
appointmentCtrl.factory('appointmentVO', function(){
  var appointmentVO = {};
  
  appointmentVO.doctorId = "";
  appointmentVO.doctorName = "";
  appointmentVO.specialityId = 0;
  appointmentVO.specialityDesc = "";
  appointmentVO.perIni = '';
  appointmentVO.perEnd = '';
  appointmentVO.monthIni = 0;
  appointmentVO.monthEnd = 0; 
  appointmentVO.convenioId = 0;


  return appointmentVO;

})
doctorsCtrl.factory('scheduleFactory', function(){
  var scheduleObj = {}
  scheduleObj.List = []

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
        //tableUrl = '/1/objects/',

    function getUrl(path) {
        //return Backand.getApiUrl() + tableUrl + path;
        console.log("PathRoute: " + path)
        return Doctappbknd.tableUrl + path;
    };
    service.all = function (param) {
        return $http.get(getUrl(route), {
            params: { param }
        });
    };
    service.allBySpec = function(param){
        var docRoute = '/doctors/';        
        console.log(getUrl(docRoute));
        return $http.get(getUrl(docRoute), {
            params: {'specialityId' : param}
        });
    };

    service.save = function(param) {
      return $http.post(getUrl(route), param );
    };

})

appointmentCtrl.service('LoadingService', function($ionicLoading){
  var service = this;

  //Loading
  service.show = function() {
    $ionicLoading.show({
      template: 'Buscando Informações...'
    });
  };
  service.hide = function(){
    $ionicLoading.hide();
  };

})
//DoctorFactory
appointmentCtrl.controller('newAppointmentCtrl', function($scope, $ionicModal, $ionicPopup, $state, appointmentVO, scheduleFactory, ScheduleService, LoadingService) {
  
  $scope.appointmentVO = appointmentVO;
  // Form data for the Appointments
  $scope.loginData = {};

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
  /* ----------------------------------- ZOOM DEFINITIONS ------------------------------------ */
  /* ----------------------------------------------------------------------------------------- */
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/doctorsZoom.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.docZmodal = modal;
  });

 // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/doctors.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.docLmodal = modal;
  });


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/specialityZoom.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.specZmodal = modal;
  });

    // Create the login modal that we will use later
  /*$ionicModal.fromTemplateUrl('templates/cityZoom.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.cityZmodal = modal;
  });*/

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
  $scope.goToVerify = function() {

    //Limpa lista anterior para descartar eventuis 'lixos'
    scheduleFactory.delList();
        
    //Melhorar esse codigo ahahah 
    //appointmentVO.monthIni = /*appointmentVO.perIni.getMonth() + 1, */
    //appointmentVO.monthEnd = /*appointmentVO.perEnd.getMonth() + 1; */

    //delete appointmentVO['perIni'];
    //delete appointmentVO['perEnd'];

    //console.log(appointmentVO);
    
    LoadingService.show();
    //Chama API para verificar horarios disponiveis By Doctor   
    if(appointmentVO.doctorId != ""){
      ScheduleService.all(appointmentVO)
            .then(function (result) {
              console.log(result.data);  
              LoadingService.hide();    

              if(result.data.length > 0){
                scheduleFactory.addList(result.data);              
                $state.go('app.setAppointment');                      
              }else{
                var alertPopup = $ionicPopup.alert({
                    title: 'Busca horários',
                    template: 'Não existem horários disponiveis para os dados informados.' });
              }
            });
    }else{ //Chama API para verificar horarios disponiveis By Speciality
      ScheduleService.allBySpec(appointmentVO.specialityId)
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

})

appointmentCtrl.controller('setAppointmentCtrl', function($scope, $ionicPopup, appointmentVO, scheduleFactory, ScheduleService ) {

  $scope.appointmentVO     = appointmentVO;
  $scope.schdlFreeTime     = scheduleFactory;
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

});

