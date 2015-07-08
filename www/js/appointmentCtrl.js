var appointmentCtrl = angular.module('AppointmentCtrl', []);
//var appointmentCtrl = angular.module('AppointmentCtrl', ['doctorsCtrl']);
doctorsCtrl.factory('appointmentVO', function(){
  return {appointmentVO: ""} 
})


appointmentCtrl.controller('newAppointmentCtrl', function($scope, $ionicModal, $state, appointmentVO) {
  
  $scope.appointmentVO = appointmentVO;

  // Form data for the Appointments
  $scope.loginData = {};
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




  // Triggered in the login modal to close it
  $scope.closeZoom = function(zoomId) {
    if(zoomId == "dz"){ 
      $scope.docZmodal.hide();
      console.log("DoctorZoom CLose");
    }else{
      $scope.specZmodal.hide();
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


  // Set fields on the Appointment form with zoom datas
  $scope.setDoctorChoice = function(doctor) {
    $scope.appointmentVO.doctor = doctor.name;
  };
  $scope.setSpecChoice = function(speciality){
    $scope.appointmentVO.speciality = speciality.description;
  };


  /**
   Chama tela de disponibilidade de horarios de acordo com os parametros introduzidos na tela de Nova Consulta
   **/
  $scope.goToVerify = function() {
     $state.go('app.setAppointment');   
  };  

})
