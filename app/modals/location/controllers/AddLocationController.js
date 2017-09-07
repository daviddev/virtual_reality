angular.module('inspinia').controller('AddLocationController',
    function($scope , $rootScope, Restangular , $state, $uibModalInstance, notify, companies){

        $scope.location = {};
        $scope.companies = companies.companies;
        
        $scope.ok = function () {
            Restangular.all('/locations').post($scope.location).then(function(response) {
                $rootScope.locationPush(response.location);
                $uibModalInstance.close();

                notify({ 
                    message: 'Success - Location has been successfully created!',
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
