angular.module('inspinia').controller('AddCreditsFromPurchasesController',
    function($rootScope, $scope , Restangular , $state, $uibModalInstance, notify, customers){
    $scope.selectedCredit = 1;
    $scope.customers = customers.customers;
    $scope.action = 'purchase';

    var credits = {
        '1': {
            source: 'Walk Ins',
            duration: '15 minutes',
            purchase_price : 9.99
        },
        '2': {
            source: 'Walk Ins',
            duration: '30 minutes',
            purchase_price : 14.99
        },
        '3': {
            source: 'Walk Ins',
            duration: '60 minutes',
            purchase_price : 19.99
        },
        '4': {
            source: 'VR Party',
            duration: '15 minutes',
            purchase_price : 9.99
        },
        '5': {
            source: 'VR Party',
            duration: '30 minutes',
            purchase_price : 14.99
        },
        '6': {
            source: 'VR Party',
            duration: '60 minutes',
            purchase_price : 19.99
        },
        '7': {
            source: 'Split Party',
            duration: '15 minutes',
            purchase_price : 9.99
        },
        '8': {
            source: 'Split Party',
            duration: '30 minutes',
            purchase_price : 14.99
        },
        '9': {
            source: 'Split Party',
            duration: '60 minutes',
            purchase_price : 19.99
        }
    };

    $scope.$watch('selectedCredit', function (newVal, oldVal) {
        $scope.credit = {
            purchase_datetime: new Date(),
            source: credits[newVal].source,
            duration: credits[newVal].duration,
            purchase_price: credits[newVal].purchase_price
        };
    });

    $scope.selectCredit = function (credit) {
        $scope.selectedCredit = credit;
    };

    $scope.otherDuration = function () {
        $scope.credit.duration = $scope.credit.duration_other + ' minutes'
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveCredits = function () {
        $scope.errors = 0;
        angular.forEach(angular.element(".required"), function(value, key){
            var elem = angular.element(value);
            if (elem.val() == '' || elem.val() == '? undefined:undefined ?')
            {
                elem.attr('style', 'border:1px solid red;');
                $scope.errors++;
            }
        });

        if ($scope.errors == 0)
        {
            $scope.credit.location_id = $rootScope.selectedLocation;
            $scope.credit.customer_id = $scope.selectedCustomer

            Restangular.all('/credits').post($scope.credit).then(function(response) {
                notify({ 
                    message: 'Success - Credits has been successfully added!',
                    classes: 'alert-info',
                    templateUrl: $rootScope.inspiniaTemplate
                });
                $uibModalInstance.dismiss('cancel');
            }, function (errorResponse) {
                notify({ 
                    message: 'Whoops! - Something went wrong!',
                    classes: 'alert-danger',
                    templateUrl: $rootScope.inspiniaTemplate
                });
            });
        }

    };

    $scope.selectCustomer = function (selectedCustomer) {
        $scope.selectedCustomer = selectedCustomer;
    };

});
