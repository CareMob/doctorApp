var doctorsCtrl = angular.module('doctorsCtrl', ['AppointmentCtrl']);

/* Função para busca de Medico para popular zooms.. */
doctorsCtrl.controller('doctorsSearchZoom', function($scope, appointmentVO, $http){
	$scope.appointmentVO = appointmentVO;

    var controller = this,
        tableUrl = 'https://doctorappbknd.herokuapp.com/api/doctors',
        //tableUrl = 'http://localhost:8080/api/doctors',
        path = ''
        http = $http;
        //'/1/objects/',
    //var dashboard = this;

    // Criar uma lib com isso .... :     
    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
    // =====================================================================================================================

    function getUrl() {
        //return Backand.getApiUrl() + tableUrl + path;
        return tableUrl + path;
    }

    controller.all = function () {
        $http.get(getUrl())        
                .success(function(data, status, headers, config) {                    
                    //console.log(data[0].name + ' - ' + data[0].doctor.speciality.description.toProperCase());
                    $scope.doctors = data;                    
                }).error(function(data, status, headers, config) {
                    $scope.doctors = data;
                });
        //return $http.get(getUrl());
    };

   controller.all();

   //console.log($scope.doctors);*/

  

    /*function getDoctors() {
        controller.all().then(function (result) {
                var teste = angular.fromJson(result.data);

                console.log("Result: " + teste);
                console.log('Result.data: ' + angular.fromJson(result.data));
                console.log('Result.data.data: ' + result.data.data);
                $scope.doctors = result.data.data;
            });
    }

    getDoctors();*/


	// -- Function para trazer os medicos no filtro de busca doctorZoom.htl-- 
	/*$scope.doctors = [{id: '345', name: 'Fabiana Aver Pires', speciality: 'Ginecologista', infos: '54 32022522 - Rua os 18 do forte 2000 sala 206'}, 
                     {id: '543', name: 'Katia Tomaschewski Moitta', speciality: 'Ginecologista', infos: '5430274090 - 5432144094 Rua Feijo Junior, 921AD (Sao Pelegrino)'}, 
                     {id: '134', name: 'Tirso Luchese Galvan', speciality: 'Ginecologista', infos: '5432212901 - Av. Júlio de Castilhos, 2101 - 78 (Centro)'}, 
                     {id: '321', name: 'Kenia Fogaça da Silveira', speciality: 'Psiquiatria', infos: '5430390191 - Rua Pinheiro Machado, 2076 sala 304 (Centro)'}, 
                     {id: '214', name: 'Leonardo Prates de Lima', speciality: 'Psiquiatria', infos: '5432029000 - Rua Moreira César, 2400' }, 
                     {id: '352', name: 'Aurea dos Santos Celli', speciality: 'Pediatra',  infos: '5430277787 - R Garibaldi, 680 - Sl. 101 (Centro)'}, 
                     {id: '216', name: 'Alvaro Jose Castilhos', speciality: 'Geriatria', infos: '5432214398 Garibaldi, 789 (Exposicao)'},
                     {id: '976', name: 'Cristina Worm Weber', speciality: 'Alergista', infos: '5430272929/5432239909 Rua Ernesto Alves, 1887 - sala 602 (Centro)'}, 
                     {id: '543', name: 'Dagoberto Vanoni de Godoy', speciality: 'Pneumologista', infos: '5432284882 - Rua Arcy Rocha Nóbrega, 401 S 201'}, 
                     {id: '134', name: 'Deize de Zorzi Piccoli', speciality: 'Gastroenterologista', infos: '5432212901 - Av. Júlio de Castilhos, 2101 - 78 (Centro)'}, 
                     {id: '321', name: 'Eduardo Gomes De Andrade', speciality: 'Quiropraxista', infos: '5432194059 - Rua General Arcy da Rocha Nóbrega, 401 (Madureira)'}, 
                     {id: '214', name: 'Roberto Antonio Conte', speciality: 'Oftalmologista',  infos: '5432282133 - Os Dezoito do Forte, 1098 - Térreo (Sao Pelegrino)'}
                    ];*/
})

//Realizar busca de especialidades junto ao medico
doctorsCtrl.controller('specialitySearchZoom', function($scope, appointmentVO, $http){
    var controller = this,
          //tableUrl = 'http://localhost:8080/api/specialities',
          tableUrl = 'https://doctorappbknd.herokuapp.com/api/specialities',
              path = '';

    // Criar uma lib com isso .... :     
    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
    // =====================================================================================================================

    function getUrl() {
        //return Backand.getApiUrl() + tableUrl + path;
        return tableUrl + path;
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

    /*function getUrl() {
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
    getSpecialities();*/

     /*$scope.specialities = [{id: '1234', description: 'Ginecologista'},
                         {id: '4123',  description: 'Psiquiatria'},
                         {id: '3454',  description: 'Pediatra'},
                         {id: '1853',  description: 'Geriatria'},
                         {id: '7468',  description: 'Alergista'},
                         {id: '0563',  description: 'Pneumologista'},
                         {id: '3457',  description: 'Quiropraxista'},
                         {id: '7425',  description: 'Oftalmologista'}
                         ];*/



})