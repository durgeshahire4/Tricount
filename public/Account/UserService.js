myapp.factory('UserService', UserService);

UserService.$inject = ['$http'];

function UserService ($http) {
	var service = {};
  service.GetAll = GetAll;
  service.AddNewUser = AddNewUser;
  service.GetUser = GetUser;
  service.DeleteUser = DeleteUser;
  service.UpdateUser = UpdateUser;
  service.GetUserByUsername = GetUserByUsername;
  return service;

  function GetAll () {
    return $http.get('/api/getAllUser').then( _handleSuccess , _handleError );  
  };

  function AddNewUser (user) {
    return $http.post('/api/addNewUser', user).then(_handleSuccess, _handleError);
  };

  function GetUser (id) {
    return $http.get('/api/getUser/'+id).then(_handleSuccess, _handleError);
  };

  function DeleteUser (id) {
    return $http.delete('/api/deleteUser/'+ id).then(_handleSuccess, _handleError);
  };

  function UpdateUser (id, user) {
    return $http.post('/api/updateUser/'+ id, user).then(_handleSuccess, _handleError);
  };

  function GetUserByUsername (username) {
    return $http.get('/api/getByUsername/'+ username).then(_handleSuccess, _handleError);
  }

  function _handleSuccess (res) {
    return res.data;
  };

  function _handleError (err) {
    alert(err);
    console.log(err);
  };
}