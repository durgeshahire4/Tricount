myapp.factory('AuthService', AuthService);

AuthService.$inject = ['$http', 'UserService','$cookieStore', '$timeout', '$rootScope'];

function AuthService ($http, UserService, $cookieStore, $timeout, $rootScope) {
	var service = {};
	service.Login = Login;
	service.SetCredentials = SetCredentials;
	service.ClearCredentials = ClearCredentials;
	service.GetCredentials = GetCredentials;
	return service;

	

	function Login (username, password, callback) {
		$timeout(function(){
			var response;
			UserService.GetUserByUsername(username).then(function (res) {
				if (res[0].username === username && res[0].password === password){
					response = {success: true, data: res[0] };
				} else {
					response = {success: false};
				}
				callback(response);
			});
		}, 1000);
	};

	function SetCredentials (userInfo) {
		$rootScope.globals = {
			currentUser: {
			  username: userInfo.username,
			  password: userInfo.password,
			  name: userInfo.name
			}	
		}
		$cookieStore.put('globals', $rootScope.globals);
	};

	function GetCredentials () {
		return $rootScope.globals;
	}

	function ClearCredentials () {
		$rootScope.globals = {};
		$cookieStore.remove('globals');
	};
};