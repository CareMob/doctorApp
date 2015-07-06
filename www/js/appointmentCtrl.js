var appointmentCtrl = angular.module('AppointmentCtrl', ['doctorsCtrl']);

appointmentCtrl.controller('newAppointmentCtrl', function($scope, $ionicModal, Data) {
  
  $scope.data = Data;

  // Form data for the Appointments
  $scope.loginData = {};
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/doctorsZoom.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });




  // Triggered in the login modal to close it
  $scope.closeZoom = function() {
    $scope.modal.hide();
  };
  // Open the login modal
  $scope.doctorZoom = function() {
    $scope.modal.show();
  };

  // Open the login modal
  $scope.setDoctorChoice = function(doctor) {
    $scope.data.doctor = doctor.name ;
  };



})