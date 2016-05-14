myapp.controller('UserController', function ($scope, $http, UserService) {
  
  $scope.reset = function () {
    $scope.userObj = {
      isEditMode: false
    }
  };

  $scope.init = function () {
    $scope.reset();
    $scope.userList = [];
    UserService.GetAll().then(function (res) {
      $scope.userList = res;
    });
  };

  $scope.init();

  $scope.addNewUser = function () {
    UserService.AddNewUser($scope.userObj).then(function (res) {
      $scope.reset();
      $scope.userList = res;
    });
  };

  $scope.deleteUser = function (id) {
    UserService.DeleteUser(id).then(function (res) {
      $scope.userList = res;
    });
  };

  $scope.updateUser = function (id) {
    UserService.UpdateUser(id, $scope.userObj).then(function (res) {
      $scope.reset();
      $scope.userList = res; 
    });
  }

  $scope.editUser = function (id) {
    UserService.GetUser(id).then(function (res) {
      if (res) {
        $scope.userObj = {
          isEditMode: true,
          id: res[0]._id,
          name: res[0].name,
          username: res[0].username,
          password: res[0].password,
          mobile: res[0].mobile
        }
      }      
    });
  };
});