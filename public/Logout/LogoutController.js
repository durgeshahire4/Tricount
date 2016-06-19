myapp.controller('LogoutController', LogoutController);

LogoutController.$inject = ['$scope', '$location', 'AuthService'];

function LogoutController ($scope,  $location, AuthService) {
  AuthService.ClearCredentials();
  $location.url('/Login');
}