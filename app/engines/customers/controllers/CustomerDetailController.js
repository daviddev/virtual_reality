angular.module('inspinia').controller('CustomerDetailController',
    ['$rootScope', '$scope' , 'Restangular' , '$state', 'customerId', 'customer', 'moment', '$uibModal',
    function($rootScope, $scope , Restangular , $state, customerId, customer, moment, $uibModal){
        $scope.customer = customer.customer;
        $scope.favoriteGame = customer.favoriteGame;

        $scope.editNote = false;

        $scope.limit = 3;

        $scope.loadMore = function() {
            $scope.limit += 3;
        }

        $scope.editNoteSubmit = function () {
            $scope.editNote = false;
            var data = {
                action: 'editNote',
                customer: {
                    note: $scope.customer.note
                }
            };
            Restangular.all('customers/'+customerId).customPUT(data);
        }

        var totalPurchase = 0;

        angular.forEach($scope.customer.credits, function(credit, keyCredit) {
            totalPurchase += parseFloat(credit.purchase_price);
        });

        $scope.customer.totalPurchase = totalPurchase.toFixed(2);

        var sparkline2Data = [];
        angular.forEach(customer.countByMonths, function (value, key) {
            sparkline2Data.push(value);
        });

        var sparkline2Options = {
            type: 'line',
            width: '100%',
            height: '50',
            lineColor: '#1ab394',
            fillColor: "transparent"
        };

        $scope.sparkline2 = sparkline2Data;
        $scope.sparkline2Options = sparkline2Options;

        $scope.addCredits = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/app/modals/credits/views/index.html',
                controller: 'AddCreditsController',
                size: 'lg',
                resolve: {
                    customer: function () {
                        return $scope.customer;
                    },
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            name: 'inspinia',
                            files: [
                                '/app/modals/credits/controllers/AddCreditsController.js',
                            ]
                        });
                    }]
                }
            });
        }
}]);
