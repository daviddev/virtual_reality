angular.module('inspinia').controller('PurchasesController',
	function ($scope , Restangular , $state, credits, $timeout, $uibModal, customers) {
		$scope.credits = credits.credits;
		angular.forEach($scope.credits, function(value, key) {
			if (value.customer != null)
			{
				$scope.credits[key].name = value.customer.first_name + ' ' + value.customer.last_name;
			}
		});

		$scope.search = {};

		$timeout(function() {
			$('#dateAdd').val('');
		}, 100);
		
		$scope.blur = function () {
			$timeout(function() {
				$scope.search.purchase_datetime = $('#dateAdd').val();
			}, 100);
		}

		$scope.addCredits = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/app/modals/credits/views/index.html',
                controller: 'AddCreditsFromPurchasesController',
                size: 'lg',
                resolve: {
                    customers: function () {
                        return customers;
                    },
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            name: 'inspinia',
                            files: [
                                '/app/modals/credits/controllers/AddCreditsFromPurchasesController.js',
                            ]
                        });
                    }]
                }
            });
        }
	}
)