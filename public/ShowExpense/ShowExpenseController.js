myapp.controller('ShowExpenseController', ShowExpenseController);

ShowExpenseController.$inject = ['$scope','$routeParams', 'ExpenseService', 'AccountsService', '$timeout'];

function ShowExpenseController ($scope, $routeParams, ExpenseService, AccountsService, $timeout) {
	
	$scope.account_id = $routeParams.account_id;
	$scope.reset = function () {
		$scope.expenseList = [];
		$scope.expenseObj = {};
	};

	$scope.init = function () {
	//	$('#datepicker').datepicker();
		$scope.reset();
		AccountsService.GetAccount($scope.account_id).then(function (res) {
			$scope.account = res[0];
		});
		ExpenseService.GetExpenseByAccount($scope.account_id).then(function (res) {
			$scope.expenseList = res;
		});

		$timeout(function () {
			$scope.participantCost = [];
			_.each($scope.account.participants, function (participant) {
				var participantCostObj={};
				participantCostObj.selected = true;
				participantCostObj.participant = participant;
				participantCostObj.eachCost = 0;
				$scope.participantCost.push(participantCostObj);
			})
		}, 100);

	};

$scope.$watch('expenseObj.cost', function(NewV, OldV) {
	if (NewV) {
		$scope.setCostToSelectedPerson(NewV);
	}
});

	$scope.onCheckboxChange = function (index) {
		$scope.participantCost[index].selected = !$scope.participantCost[index].selected;
		$scope.setCostToSelectedPerson();
	}

	$scope.addNewExpense = function () {
		ExpenseService.AddNewExpense({
			account_id: $scope.account_id,
			reason: $scope.expenseObj.reason,
			cost: $scope.expenseObj.cost,
			payment_date: $scope.expenseObj.payment_date,
			paid_by: $scope.expenseObj.paid_by,
			expense_for: $scope.participantCost
		}).then(function (res) {
			$scope.expenseList = res;
		});

	};

	$scope.clear= function () {
		$scope.expenseObj = {};
	};

	$scope.setCostToSelectedPerson = function() {
		if ($scope.expenseObj.cost) {
			var totalSelected = _.where($scope.participantCost, {selected : true}).length;
			_.map($scope.participantCost, function(participant) {
				if (participant.selected) {
					participant.eachCost = $scope.expenseObj.cost / totalSelected;
				} else {
					participant.eachCost = 0;
				}
				return participant;
			})
		}
	};
	$scope.deleteExpense = function (id) {
    ExpenseService.DeleteExpense($scope.account_id, id).then(function (res) {
      $scope.expenseList = res;
      console.log(res);
    });
  };

	$scope.init();

	
}