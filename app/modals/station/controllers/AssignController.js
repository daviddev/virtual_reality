angular.module('inspinia').controller('AssignController',
    function($rootScope, $scope , Restangular , $state, $uibModalInstance, notify, customers){

    $scope.customers = [];

    angular.forEach(customers.customers, function (value, key) {
        $scope.customers.push({
            id: value.id,
            first_name: value.first_name,
            last_name: value.last_name,
            name: value.first_name + ' ' + value.last_name
        });
    });

    $scope.data = {};

    $scope.ok = function () {
        $rootScope.selectCustomer($scope.selected.id);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
