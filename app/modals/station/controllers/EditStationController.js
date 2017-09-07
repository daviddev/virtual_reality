angular.module('inspinia').controller('EditStationController',
    function($rootScope, $scope , Restangular , $state, $uibModalInstance, notify, stationId, station){

        $scope.action = 'edit';

        $scope.station = {
            location_id: station.station.location_id,
            name: station.station.name,
            type: station.station.type,
            equipment_serial: station.station.equipment_serial,
            width: station.station.width,
            depth: station.station.depth
        };

    $scope.ok = function () {
        Restangular.all('/stations/'+stationId).customPUT($scope.station).then(function (response) {
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
