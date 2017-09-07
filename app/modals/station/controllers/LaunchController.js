angular.module('inspinia').controller('LaunchController',
    function($rootScope, $scope , Restangular , $state, $uibModalInstance, notify, games){

    $scope.games = [];

    angular.forEach(games.games, function (value, key) {
        $scope.games.push({
            id: value.id,
            name: value.name
        });
    });

    $scope.data = {};

    $scope.ok = function () {
        $rootScope.selectGame($scope.selected.id);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
