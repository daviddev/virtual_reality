angular.module('inspinia').controller('AddUserController',
    function($rootScope, $scope , Restangular , $state, $uibModalInstance, notify, user, companies, locations){
    
        $scope.locations = locations;
        $scope.companies = companies;
        $scope.editableUser = user;
        $scope.editableUser.companies = [];
        angular.forEach($scope.editableUser.company, function (value, key) {
            $scope.editableUser.companies.push(value.id.toString());
        });
        if ($scope.editableUser.location_id != null) {
            $scope.editableUser.location_id = $scope.editableUser.location_id.toString();
        }

        $scope.submit = function () {
            if ($scope.editableUser.id != undefined) {
                $scope.updateUser();
            } else {
                $scope.saveUser();
            }
        }

        $scope.updateUser = function () {
            Restangular.all('/users/' + $scope.editableUser.id).customPUT($scope.editableUser).then(function(response) {
                $rootScope.users = response.users;
                $scope.cancel();
                notify({ 
                    message: 'Success - User has been successfully updated!',
                    classes: 'alert-info',
                    templateUrl: $rootScope.inspiniaTemplate
                });
            }, function (errorResponse) {
                notify({ 
                    message: 'Whoops! - Something went wrong!',
                    classes: 'alert-danger',
                    templateUrl: $rootScope.inspiniaTemplate
                });
            });
        };

        $scope.saveUser = function () {
            Restangular.all('/users').post($scope.editableUser).then(function(response) {
                $rootScope.users = response.users;
                $scope.cancel();
                notify({ 
                    message: 'Success - User has been successfully created!',
                    classes: 'alert-info',
                    templateUrl: $rootScope.inspiniaTemplate
                });
            }, function (errorResponse) {
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
