myapp.factory('ExpenseService', ExpenseService);

ExpenseService.$inject = ['$http'];

function ExpenseService ($http) {
	var service = {};
	service.GetExpenseByAccount = GetExpenseByAccount;
	service.GetExpense = GetExpense;
	service.AddNewExpense = AddNewExpense;
	service.DeleteExpense = DeleteExpense;
  return service;

  function GetExpenseByAccount (accountId) {
 		return $http.get('/api/getAllExpense/'+ accountId).then( _handleSuccess , _handleError ); 
 	}

 	function GetExpense (expenseId) {
 		return $http.get('/api/getExpense/'+ expenseId).then( _handleSuccess , _handleError ); 
 	}

 	function AddNewExpense (expense) {
 		return $http.post('/api/addNewExpense', expense).then(_handleSuccess, _handleError);
 	}

 	function DeleteExpense (accountId, expenseId) {
      return $http.delete('/api/deleteExpense/' + accountId + '/' + expenseId).then(_handleSuccess, _handleError);
    };

	function _handleSuccess (res) {
		return res.data;
	};

	function _handleError (err) {
	  alert(err);
	  console.log(err);
	};
}