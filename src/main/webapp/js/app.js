//URL de acesso ao servidor RESTful
SERVER_URL = "http://localhost:8000/vendas2";
//Criação ao $app que é o modulo que representa toda a aplicação
$app = angular.module('app',['ngResource','ngRoute']);
$app.config(function($routeProvider,$httpProvider){
	// $httpProvider.defaults.headers.common('application/json');
	//Configura o route provider
	$routeProvider.
	when('/',{templateUrl:'view/main.html'}).
	when('/clientes',{templateUrl:'view/clientes/main.html',controller:'clientesController'}).
	when('/clientes/new',{templateUrl:'view/clientes/update.html',controller:'clientesController'}).
	when('/cliente/:id',{templateUrl:'view/clientes/update.html',controller:'clientesController'}).
	when('/funcionarios',{templateUrl:'view/clientes/index.html',controller:'clientesController'}).
	otherwise({redirectTo:'/'});

	angular.module('services.myHttpInterceptor',[])
	.factory('myHttpInterceptor', ['$q', '$http', '$httpProvider','$error', '$data',function($q, $http, $httpProvider, $data, $error) {
    return {
      // optional method
      'request': function(config) {
        // do something on success
        return config;
      },
      'response': function(promise) {
        return function(promise) {//2
			//Always disable loader
			// $rootScope.hideLoader();
			return promise.then(function(response) {//3
				// do something on success
				return(response);
			}, function(response) { //3 4
				
			});//4
		}//2
      },
      // optional method
     'responseError': function(response) {
        // do something on error
		$data = response.data;
		$error = $data.error;
		console.error($data);
		if ($error && $error.text) alert("ERROR: " + $error.text);
		else {
			if (response.status=404) alert("Erro ao acessar servidor. Página não encontrada. Veja erros para maiores detalhes");
			else alert("ERROR! See log console");
		}
		return $q.reject(response);
      }
    };
  }]);
  angular.module('app',['services.myHttpInterceptor']).config(function ($httpProvider) {
  	$httpProvider.interceptors.push('myHttpInterceptor');
  });

// 	//configura o RESPONSE interceptor, usado para exibir o ícone de acesso ao servidor
// 	// e a exibir uma mensagem de erro caso o servidor retorne algum erro
	// $httpProvider.responseInterceptors.push(function($q,$rootScope) {//1
	// 	return function(promise) {//2
	// 		//Always disable loader
	// 		$rootScope.hideLoader();
	// 		return promise.then(function(response) {//3
	// 			// do something on success
	// 			return(response);
	// 		}, function(response) { //3 4
	// 			// do something on error
	// 			$data = response.data;
	// 			$error = $data.error;
	// 			console.error($data);
	// 			if ($error && $error.text) alert("ERROR: " + $error.text);
	// 			else {
	// 				if (response.status=404) alert("Erro ao acessar servidor. Página não encontrada. Veja erros para maiores detalhes");
	// 				else alert("ERROR! See log console");
	// 			}
	// 			return $q.reject(response);
	// 		});//4
	// 	}//2
	// });//1


});
	
$app.run(function($rootScope){
	//Uma flag que define se o ícone de acesso ao servidor deve estar ativado
	$rootScope.showLoaderFlag = false;
	//Força que o ícone de acesso ao servidor seja ativado
	$rootScope.showLoader=function(){
		$rootScope.showLoaderFlag=true;
	}
	//Força que o ícone de acesso ao servidor seja desativado
	$rootScope.hideLoader=function(){
		$rootScope.showLoaderFlag=false;
	}
	//Método que retorna a URL completa de acesso ao servidor.
	// Evita usar concatenação no conteroller
	$rootScope.server=function(url){
		return SERVER_URL + url;
	}
});

//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
$app.filter('startFrom', function() {
	return function(input, start) {
		if (input==null)
		return null;
		start = +start; //parse to int
		return input.slice(start);
	}
});
