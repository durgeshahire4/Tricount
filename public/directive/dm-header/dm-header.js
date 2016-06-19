myapp.directive('dmHeader', dmHeader);

dmHeader.$inject = ['AuthService'];

function dmHeader (AuthService) {
	return {
		templateUrl: 'directive/dm-header/dm-header.html',
		scope: {},
		controller: function ($scope) {
			$scope.init = function () {
				$scope.currentUser = AuthService.GetCredentials().currentUser;
				$scope.isLogin = $scope.currentUser ? true : false;
			}
			$scope.init();

			$scope.$watch(function () {
				return AuthService.GetCredentials().currentUser;
			}, function () {
				$scope.init();
			})
			
			
		}
	}	
};