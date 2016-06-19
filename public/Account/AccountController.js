myapp.controller('AccountController', function ($scope, $http, UserService, AccountsService, _, $location) {
  
  $scope.reset = function () {
    $scope.accountObj = {};
    $scope.accountsList = [];
    $scope.participantList = [];
  }

  $scope.init = function () {
    $scope.reset();
    AccountsService.GetAll().then(function (res) {
      $scope.accountsList = res;
    });
  };

  $scope.init();

  $scope.addNewAccount = function () {
    $scope.accountObj.participants = $scope.participantList;
    AccountsService.AddNewAccount($scope.accountObj).then(function (res) {
      $scope.reset();
      $scope.accountsList = res;
    });
  };

  $scope.deleteAccount = function (id) {
    AccountsService.DeleteAccount(id).then(function (res) {
      $scope.accountsList = res;
    });
  };

  $scope.addParticipant = function () {
    $scope.participantList.push($scope.participant);
    $scope.participant = ''; 
  }

  $scope.onClickAccount = function (id) {
    $location.url('/Account/ShowExpense/'+id);
  }

  // $scope.updateUser = function (id) {
  //   UserService.UpdateUser(id, $scope.userObj).then(function (res) {
  //     $scope.reset();
  //     $scope.userList = res; 
  //   });
  // }

  // $scope.editUser = function (id) {
  //   UserService.GetUser(id).then(function (res) {
  //     if (res) {
  //       $scope.userObj = {
  //         isEditMode: true,
  //         id: res[0]._id,
  //         name: res[0].name,
  //         username: res[0].username,
  //         password: res[0].password,
  //         mobile: res[0].mobile
  //       }
  //     }      
  //   });
  // };
});