var myApp = angular.module('myApp',[]);

myApp.controller('AppCtrl',['$scope', '$http', function($scope, $http){
	console.log("Hello from controller");
$scope.bool = false;
	var refresh = function(){
		$http.get('/controller').success(function(response){

	$scope.bool = false;
		$scope.contactlist = response;

		$scope.contact="";

	});

	};
	refresh();

	$scope.addContact = function(){
		console.log($scope.contact);
		$http.post('/controller', $scope.contact).success(function(response){
			$scope.bool = false;
			console.log("response"  + response);
			refresh();
		});
	};
	
	$scope.remove =function(id){
		console.log(id);
		$http.delete('/controller/' + id).success(function(response){
		$scope.bool = false;
			console.log("From delete"+response);
			refresh();
		});

	};

	$scope.edit =function(id){
		console.log("Id from edit"+id);
		$http.get('/controller/' + id).success(function(response){
			$scope.bool = true;
			$scope.contact = response;
			
			
		});
	};

	$scope.update =function(){
		
		$http.put('/controller/' + $scope.contact._id, $scope.contact ).success(function(response){
			console.log(response);
			
			refresh();
			
		});
	};
	

}]);