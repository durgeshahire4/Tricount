myapp.factory('AccountsService', AccountsService);

AccountsService.$inject = ['$http'];

function AccountsService ($http) {
	var service = {};
  service.GetAll = GetAll;
  service.AddNewAccount = AddNewAccount;
  service.GetAccount = GetAccount;
  service.DeleteAccount = DeleteAccount;
  // service.UpdateUser = UpdateUser;
  // service.GetUserByUsername = GetUserByUsername;
  return service;

  function GetAll () {
    return $http.get('/api/getAllAccounts').then( _handleSuccess , _handleError );  
  };

  function AddNewAccount (account) {
    return $http.post('/api/addNewAccount', account).then(_handleSuccess, _handleError);
  };

  function GetAccount (id) {
    return $http.get('/api/getAccount/'+id).then(_handleSuccess, _handleError);
  };

  function DeleteAccount (id) {
    return $http.delete('/api/deleteAccount/'+ id).then(_handleSuccess, _handleError);
  };

  // function UpdateUser (id, user) {
  //   return $http.post('/api/updateUser/'+ id, user).then(_handleSuccess, _handleError);
  // };

  // function GetUserByUsername (username) {
  //   return $http.get('/api/getByUsername/'+ username).then(_handleSuccess, _handleError);
  // }

  function _handleSuccess (res) {
    return res.data;
  };

  function _handleError (err) {
    alert(err);
    console.log(err);
  };
}