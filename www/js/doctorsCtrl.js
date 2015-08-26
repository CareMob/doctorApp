var doctorsCtrl = angular.module('doctorsCtrl', ['AppointmentCtrl']);

doctorsCtrl.service('DoctorService', function($http, Doctappbknd) {
    var service = this,        
        path = '/doctors/';
        //tableUrl = '/1/objects/',

    function getUrl() {
        //return Backand.getApiUrl() + tableUrl + path;
        return Doctappbknd.tableUrl + path;
    }

    service.all = function () {
        return $http.get(getUrl());        
        //return $http.get('http://localhost:8080/api/doctors');
    };

    /*
    function getUrlForId(itemId) {
        return getUrl(path) + itemId;
    }    

    service.fetch = function (itemId) {
        return $http.get(getUrlForId(itemId));
    };

    service.create = function (item) {
        return $http.post(getUrl(), item);
    };

    service.update = function (itemId, item) {
        return $http.put(getUrlForId(itemId), item);
    };

    service.destroy = function (itemId) {
        return $http.delete(getUrlForId(itemId));
    };
    */
}) // Service

doctorsCtrl.Factory('DoctorFactory', function(){
    var doctorObj = [];
        //doctorObj.List = [];

    doctorObj.addList = function (list){
        doctorObj = list;
    }   

    doctorObj.delList = function (){
        doctorObj = []; //melhorar isso ahahha
    }
      
    return doctorObj; 

}) //Factory


/* Função para busca de Medico para popular zooms.. Doctappbknd */
doctorsCtrl.controller('doctorsSearchZoom', function($scope, appointmentVO, $http, DoctorService){
	$scope.appointmentVO = appointmentVO;

    var doctorsZomm = this;

    // Criar uma lib com isso .... :     
    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
    // =====================================================================================================================
    function getDoctors() {
        //console.log('loading......');        
        DoctorService.all()
            .then(function (result) {                
                $scope.doctors = result.data;
                //console.log('remove loading......');        
                //console.log(result.data);
            });
            /*.success(function(data, status, headers, config) {                    
                //console.log(data);
                doctorsZomm.doctors = data;  
                $scope.doctors = data;

            }).error(function(data, status, headers, config) {
                 doctorsZomm.doctors = data;
            });*/                    
    }

    doctorsZomm.doctors = {};   
    getDoctors();   

})

//Realizar busca de especialidades junto ao medico
doctorsCtrl.controller('specialitySearchZoom', function($scope, appointmentVO, $http, Doctappbknd){
    var controller = this,
          //tableUrl = 'http://localhost:8080/api/specialities',
          //tableUrl = 'https://doctorappbknd.herokuapp.com/api/specialities',
              path = '/specialities';

    // Criar uma lib com isso .... :     
    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
    // =====================================================================================================================

    function getUrl() {
        //return Backand.getApiUrl() + tableUrl + path;
        return Doctappbknd.tableUrl + path;
    }

    controller.all = function () {
        $http.get(getUrl())        
                .success(function(data, status, headers, config) {                    
                    //console.log(data[0].name + ' - ' + data[0].doctor.speciality.description.toProperCase());
                    $scope.specialities = data;                    
                }).error(function(data, status, headers, config) {
                    $scope.specialities = data;
                });
        //return $http.get(getUrl());
    };

    controller.all();


    //var dashboard = this;

    /*
    function getUrl() {
        return Backand.getApiUrl() + tableUrl + path;
    }
    controller.all = function () {
        return $http.get(getUrl());
    };

    $scope.appointmentVO = appointmentVO;

    function getSpecialities() {
        controller.all()
            .then(function (result) {
                $scope.specialities = result.data.data;               
            });
    }
    getSpecialities();
    */    

})