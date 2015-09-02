var scheduleCtrl = angular.module('Schedules', []);
/*
scheduleCtrl.service('ScheduleService', function($http, Doctappbknd) {
    var service = this,
        route = '/schedule/';
    function getUrl(path) {                
        return Doctappbknd.tableUrl + path;
    };
    service.all = function (param) {
        return $http.get(getUrl(route), {
            params: { param }
        });
    };    
    service.save = function(param) {
      return $http.post(getUrl(route), param );
    };
})
*/

scheduleCtrl.controller('SchedulesCtrl', function($scope, $ionicPopup, ScheduleService) {

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

    $scope.schedules = [
       {epeciality: 'Pisiquiatria', doctor: 'Rodolfo Pipe Variani Mussato', date: 'Segunda, 03/07/2015' , hour: '14:30', id: 1 },  
       {epeciality: 'Gastro', doctor: 'Mauricio Faoro',  date: 'Quinta , 10/08/2015' , hour: '14:30', id: 2 },
       {epeciality: 'Clinico', doctor: 'Marcelo Menegat',  date: 'Segunda, 08/08/2015' , hour: '14:30', id: 3}  
    ];

})