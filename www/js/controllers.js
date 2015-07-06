angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function($ionicModal) {
    $scope.modal = $ionicModal;
    
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

$scope.goToSignIn = function() {
    $scope.closeLogin();
    $state.go('app.signin'); 
  };  


  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

  
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})



.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {

})

.controller('SigninCtrl', function($scope, $stateParams) {

})



.controller('SchedulesCtrl', function($scope) {


  // chamada banco

    $scope.schedules = [
       {epeciality: 'Pisiquiatria', doctor: 'Rodolfo Pipe Variani Mussato', date: 'Segunda, 03/08/2015' , hour: '14:30', id: 1 },  
       {epeciality: 'Gastro', doctor: 'Mauricio Faoro',  date: 'Quinta , 03/08/2015' , hour: '14:30', id: 2 },
       {epeciality: 'Clinico', doctor: 'Marcelo Menegat',  date: 'Segunda, 03/08/2015' , hour: '14:30', id: 3}  
    ];

})


.controller('AppointmentCtrl', function($scope, $ionicModal) {

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

})


//Typeahead  Controller para autocomplete na busca dos Medicos
.controller('DoctorsCtrl', function($scope) {

  

/* -- Function para trazer os medicos no filtro de busca doctorZoom.htl-- 
$scope.doctorsSearchZoom = function(){*/

  //$scope.selected = undefined;
  $scope.doctors = [{id: '345', name: 'Fabiana Aver Pires', epeciality: 'Ginecologista', infos: '54 32022522 - Rua os 18 do forte 2000 sala 206'}, 
                    {id: '543', name: 'Katia Tomaschewski Moitta', epeciality: 'Ginecologista', infos: '5430274090 - 5432144094 Rua Feijo Junior, 921AD (Sao Pelegrino)'}, 
                    {id: '134', name: 'Tirso Luchese Galvan', epeciality: 'Ginecologista', infos: '5432212901 - Av. Júlio de Castilhos, 2101 - 78 (Centro)'}, 
                    {id: '321', name: 'Kenia Fogaça da Silveira', epeciality: 'Psiquiatria', infos: '5430390191 - Rua Pinheiro Machado, 2076 sala 304 (Centro)'}, 
                    {id: '214', name: 'Leonardo Prates de Lima', epeciality: 'Psiquiatria', infos: '5432029000 - Rua Moreira César, 2400' }, 
                    {id: '352', name: 'Aurea dos Santos Celli', epeciality: 'Pediatra',  infos: '5430277787 - R Garibaldi, 680 - Sl. 101 (Centro)'}, 
                    {id: '216', name: 'Alvaro Jose Castilhos', epeciality: 'Geriatra', infos: '5432214398 Garibaldi, 789 (Exposicao)'}
                   ];
//}




/*
Cristina Worm Weber
Alergista - 5430272929/5432239909 Rua Ernesto Alves, 1887 - sala 602 (Centro)

Dagoberto Vanoni de Godoy
Pneumologista - 5432284882 - Rua Arcy Rocha Nóbrega, 401 S 201

Deize de Zorzi Piccoli
Gastroenterologista - 5432212122 - R Moreira Cesar, 2821 - Sl. 31 (Sao Pelegrino)

Eduardo Gomes De Andrade
Quiropraxista - 5432194059 - Rua General Arcy da Rocha Nóbrega, 401 (Madureira)

Roberto Antonio Conte
Oftalmologista - 5432282133 - Os Dezoito do Forte, 1098 - Térreo (Sao Pelegrino)

*/



}) //End doctorsCtrl

.controller('hisotryCtrl', function($scope){

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


});




// ';' apenas no final de todos os metodos :) 

//.controller('SchedulesCtrl', function($scope, $stateParams){});
