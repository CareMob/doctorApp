var doctorsCtrl = angular.module('doctorsCtrl', []);
doctorsCtrl.factory('Data', function(){
	return {doctor: ""} 
})


/* Função para busca de Medico para popular zooms.. */
doctorsCtrl.controller('doctorsSearchZoom', function($scope, Data){
	$scope.data = Data;

	// -- Function para trazer os medicos no filtro de busca doctorZoom.htl-- 
	$scope.doctors = [{id: '345', name: 'Fabiana Aver Pires', specialty: 'Ginecologista', infos: '54 32022522 - Rua os 18 do forte 2000 sala 206'}, 
                     {id: '543', name: 'Katia Tomaschewski Moitta', specialty: 'Ginecologista', infos: '5430274090 - 5432144094 Rua Feijo Junior, 921AD (Sao Pelegrino)'}, 
                     {id: '134', name: 'Tirso Luchese Galvan', specialty: 'Ginecologista', infos: '5432212901 - Av. Júlio de Castilhos, 2101 - 78 (Centro)'}, 
                     {id: '321', name: 'Kenia Fogaça da Silveira', specialty: 'Psiquiatria', infos: '5430390191 - Rua Pinheiro Machado, 2076 sala 304 (Centro)'}, 
                     {id: '214', name: 'Leonardo Prates de Lima', specialty: 'Psiquiatria', infos: '5432029000 - Rua Moreira César, 2400' }, 
                     {id: '352', name: 'Aurea dos Santos Celli', specialty: 'Pediatra',  infos: '5430277787 - R Garibaldi, 680 - Sl. 101 (Centro)'}, 
                     {id: '216', name: 'Alvaro Jose Castilhos', specialty: 'Geriatria', infos: '5432214398 Garibaldi, 789 (Exposicao)'},
                     {id: '976', name: 'Cristina Worm Weber', specialty: 'Alergista', infos: '5430272929/5432239909 Rua Ernesto Alves, 1887 - sala 602 (Centro)'}, 
                     {id: '543', name: 'Dagoberto Vanoni de Godoy', specialty: 'Pneumologista', infos: '5432284882 - Rua Arcy Rocha Nóbrega, 401 S 201'}, 
                     {id: '134', name: 'Deize de Zorzi Piccoli', specialty: 'Gastroenterologista', infos: '5432212901 - Av. Júlio de Castilhos, 2101 - 78 (Centro)'}, 
                     {id: '321', name: 'Eduardo Gomes De Andrade', epeciality: 'Quiropraxista', infos: '5432194059 - Rua General Arcy da Rocha Nóbrega, 401 (Madureira)'}, 
                     {id: '214', name: 'Roberto Antonio Conte', specialty: 'Oftalmologista',  infos: '5432282133 - Os Dezoito do Forte, 1098 - Térreo (Sao Pelegrino)'}
                    ];
})

//Realizar busca de especialidades junto ao medico
doctorsCtrl.controller('specialtySearchZoom', function($scope){

    $scope.specialtys = [{id: '1234', description: 'Ginecologista'},
                         {id: '4123', description: 'Psiquiatria'},
                         {id: '3454', description: 'Pediatra'},
                         {id: '1853', description: 'Geriatria'},
                         {id: '7468', description: 'Alergista'},
                         {id: '0563', description: 'Pneumologista'},
                         {id: '3457', description: 'Quiropraxista'},
                         {id: '7425', description: 'Oftalmologista'}
                         ];

})