myapp.controller('HomeController', function ($scope, $http, UserService, AccountsService, _) {
  
  $scope.reset = function () {
    $scope.accountObj = {}
  };

  $scope.init = function () {
    $scope.reset();
    $scope.accountsList = [];
    $scope.participantList = [];
    $('.participants-list').html('');
    generateParticipantHTML();
    AccountsService.GetAll().then(function (res) {
      $scope.accountsList = res;
    });
  };

  $scope.init();

  $scope.addNewAccount = function () {
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
    $scope.participant = null; 
    generateParticipantHTML();
  }

  function generateParticipantHTML () {
    var participantHTML = '';
    _.each($scope.participantList, function (item) {
        participantHTML = participantHTML + '<div>'+ item +'</div>'      
    });
    $('.participants-list').html(participantHTML);
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