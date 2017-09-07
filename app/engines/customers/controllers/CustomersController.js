angular.module('inspinia').controller('CustomersController',
	function($rootScope, $scope , Restangular , $state, customers, $uibModal) {
		$rootScope.customers = customers.customers;
		$scope.client = 1;

		angular.forEach($rootScope.customers, function(value, key) {
			var totalPurchase = 0;
			angular.forEach(value.credits, function(credit, keyCredit) {
				totalPurchase += parseFloat(credit.purchase_price);
			});
			$rootScope.customers[key].totalPurchase = totalPurchase.toFixed(2);

			$rootScope.customers[key].fullName = value.first_name + ' ' + value.last_name;
		});

		$scope.selectUser = function (customerId) {
			$scope.client = customerId;
		}

		$scope.customerDetail = function (customerId) {
			$state.go('app.customer', { customer: customerId});
		}
    }
)