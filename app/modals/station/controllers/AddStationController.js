angular.module('inspinia').controller('AddStationController',
    function($rootScope, $scope , Restangular , $state, $uibModalInstance, notify){

        $scope.action = 'add';

        $scope.station = {
            location_id: $rootScope.selectedLocation,
            type: 'social-room'
        };

    $scope.ok = function () {
        Restangular.all('/stations').post($scope.station).then(function (response) {
            $rootScope.refresh();
            notify({ 
                message: 'Success - Station has been successfully created!',
                classes: 'alert-info',
                templateUrl: $rootScope.inspiniaTemplate
            });
            $uibModalInstance.close();
        }, function (errorResponse) {

            notify({ 
                message: 'Whoops! - Something went wrong!',
                classes: 'alert-danger',
                templateUrl: $rootScope.inspiniaTemplate
            });
            $uibModalInstance.close();
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
