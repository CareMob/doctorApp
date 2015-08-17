var appointmentCtrl = angular.module('AppointmentCtrl', []);
//var appointmentCtrl = angular.module('AppointmentCtrl', ['doctorsCtrl']);
appointmentCtrl.factory('appointmentVO', function(){
  appointmentVO = {};
  /*appointmentVO.doctorId = 0;
  appointmentVO.doctorName = "";
  appointmentVO.specialityId = 0;
  appointmentVO.specialityDesc = "";
  appointmentVO.perIni = "";
  appointmentVO.perEnd = "";
  appointmentVO.convenioId = 0;*/

  return appointmentVO;

})
doctorsCtrl.factory('scheduleFactory', function(){
  var scheduleObj = {}
  scheduleObj.List = []

  scheduleObj.addList = function (list){
    scheduleObj.List = list;
  }   

  
  return scheduleObj; 

})
/* --  --*/

appointmentCtrl.service('ScheduleModel', function($http, Doctappbknd) {
    var service = this,        
        path = '/schedule/';
        //tableUrl = '/1/objects/',

    function getUrl() {
        //return Backand.getApiUrl() + tableUrl + path;
        return Doctappbknd.tableUrl + path;
    };

    service.all = function () {
        return $http.get(getUrl());        
    };

})

appointmentCtrl.controller('newAppointmentCtrl', function($scope, $ionicModal, $state, appointmentVO, scheduleFactory, ScheduleModel) {
  
  $scope.appointmentVO = appointmentVO;
  //$scope.scheduleVO    = scheduleVO;


  // Form data for the Appointments
  $scope.loginData = {};

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
  $ionicModal.fromTemplateUrl('templates/specialityZoom.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.specZmodal = modal;
  });

    // Create the login modal that we will use later
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
        //console.log(zoomId);
        break;
      case "sp":  
        $scope.specZmodal.hide();
        break;
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
    //console.log(appointmentVO);
  };
  $scope.setSpecChoice = function(speciality){
    $scope.appointmentVO.specialityId   = speciality._id;
    $scope.appointmentVO.specialityDesc = speciality.description;
    //console.log(appointmentVO);
  };


  /**
   Chama tela de disponibilidade de horarios de acordo com os parametros introduzidos na tela de Nova Consulta
   **/
  $scope.goToVerify = function() {
    //appointmentVO = $scope.appointmentVO;    
    console.log(appointmentVO);


    //$state.go('app.setAppointment');
    //Chama API para verificar horarios disponiveis By Doctor    
    //if(appointmentVO.doctorId != ""){      
      ScheduleModel.all()
            .then(function (result) {
              //console.log(result.data);                     
              scheduleFactory.addList(result.data);              
              $state.go('app.setAppointment');                            
                
            });

    //}else{ //Chama API para verificar horarios disponiveis By Speciality

    //}

       
  };  

})

appointmentCtrl.controller('setAppointmentCtrl', function($scope, appointmentVO, scheduleFactory, ScheduleModel ) {

  $scope.appointmentVO     = appointmentVO;
  $scope.schdlFreeTime     =  scheduleFactory;


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

