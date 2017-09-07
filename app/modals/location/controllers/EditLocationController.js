angular.module('inspinia').controller('EditLocationController',
    function($scope , $rootScope, Restangular , $state, $uibModalInstance, location, locationId, notify, companies){
        $scope.location = location.location;
        $scope.companies = companies.companies;
        $scope.location.company_id = $scope.location.company_id.toString(); 
        $scope.ok = function () {
            Restangular.all('/locations/'+locationId).customPUT($scope.location).then(function(response) {
                $rootScope.locationEdit(response.location);
                $uibModalInstance.close();

                notify({ 
                    message: 'Success - Location has been successfully updated!',
                    classes: 'alert-info',
                    templateUrl: $rootScope.inspiniaTemplate
                });

            }, function (errorResponse) {
                $uibModalInstance.close();
                notify({ 
                    message: 'Whoops! - Something went wrong!',
                    classes: 'alert-danger',
                    templateUrl: $rootScope.inspiniaTemplate
                });
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
});
