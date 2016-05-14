myapp.controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$location', 'AuthService'];

function LoginController ($scope, $location, AuthService) {
	$scope.init = function () {
		$scope.vm = {
			username: '',
			password: ''
		};
	};
	$scope.init();

	$scope.login = function () {
		$scope.loading = true;
		
		AuthService.Login($scope.vm.username, $scope.vm.password, function (res) {
			if (res.success) {
				AuthService.SetCredentials($scope.vm.username, $scope.vm.password);
				$scope.loading = false;
			  $location.url('/Home'); 					
			}
		});	
	};
};