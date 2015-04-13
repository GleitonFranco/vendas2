// $app.factory('Cliente', function($resource){	
// 	return $resource
// });

//Clientes Controller
$app.controller('clientesController',['$scope','$resource','$http','$routeParams','$location',
function clientesController($scope,$resource,$http,$routeParams,$location) {
	//lista de clientes
	$scope.rows = null;
	//um cliente
	$scope.row = null;
	//Pagination
	$scope.currentPage = 0;
	$scope.pageSize = 15;

	var Cliente = $resource('http://localhost:8000/vendas2/clientes/salvar',
		{salvar: {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			url: 'http://localhost:8000/vendas2/clientes/salvar',
		    transformResponse: function(data) {return angular.toJson({ cliente: data });}
		}
	});

	$scope.numberOfPages =function(){
		return Math.ceil($scope.rows.length/$scope.pageSize);
	}

	$scope.loadAll = function(){
//		$scope.showLoader();
		
		$http({
		      method: 'GET',
		      url: 'http://localhost:8000/vendas2/clientes/listajson',
		      headers: {'Content-Type': 'application/json'}
		    }).success(function (data) 
		      {
		    	$scope.rows = data;
		      });
		
	}

	$scope.loadRow = function(){
		if ($routeParams.id!=null)
		{
//			$scope.showLoader();
			$http.get($scope.server("/clientes/obter/"+$routeParams.id))
			.success(function(data){
				$scope.row = data;
				$scope.row.isUpdate = true;
			});
		}
		else
		{
			$scope.row = {}
			$scope.row.id = null;
			$scope.row.isUpdate = false;
		}
	}

	$scope.save = function(){
		// $scope.showLoader();
		// $http.post($scope.server("/clientes/salvar/"+$routeParams.id),$scope.row)
		// Cliente.salvar($scope.row);
		$http({
		      method: 'POST',
		      url: 'http://localhost:8000/vendas2/clientes/salvar',
		      headers: {'Content-Type': 'application/json'},
		      transformRequest: function(data) {return angular.toJson({ cliente: $scope.row });}
		      }).success(function(data){
				alert("Salvo com sucesso");
				$scope.row.isUpdate = true;
			});
	}
	
	$scope.teste = function() {
		console.log($scope.rows);
	}
	
}

]);