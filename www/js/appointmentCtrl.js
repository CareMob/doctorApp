var appointmentCtrl = angular.module('AppointmentCtrl', []);
//var appointmentCtrl = angular.module('AppointmentCtrl', ['doctorsCtrl']);
doctorsCtrl.factory('appointmentVO', function(){
  appointmentVO = {};
  appointmentVO.doctorId = 0;
  appointmentVO.doctorName = "";
  appointmentVO.specialityId = 0;
  appointmentVO.specialityDesc = "";
  appointmentVO.perIni = "";
  appointmentVO.perEnd = "";
  appointmentVO.convenioId = 0;

  return appointmentVO;

})


appointmentCtrl.controller('newAppointmentCtrl', function($scope, $ionicModal, $state, appointmentVO) {
  
  //$scope.appointmentVO = appointmentVO;
  $scope.appointmentVO = {};

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
        break;  
      case "ct":
        $scope.cityZmodal.hide();
        break;
      case "sp":  
        $scope.specZmodal.hide();
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


  /**
   Chama tela de disponibilidade de horarios de acordo com os parametros introduzidos na tela de Nova Consulta
   **/
  $scope.goToVerify = function() {
    console.log(appointmentVO);
    $state.go('app.setAppointment');   
  };  

})
