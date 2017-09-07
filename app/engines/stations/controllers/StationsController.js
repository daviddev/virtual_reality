angular.module('inspinia').controller('StationsController',
	function($rootScope, $scope , Restangular , $state, stations, $uibModal, notify){
		$scope.stations = stations.stations;

        $scope.isAssign = {};
        $scope.isLaunched = {};

		$rootScope.refresh = function () {
            angular.forEach($scope.isAssign, function(value, key) {
                $scope.isAssign[key] = false;
            })
            angular.forEach($scope.isLaunched, function(value, key) {
                $scope.isLaunched[key] = false;
            })
			$scope.stations = [];
			Restangular.one('/stations').get().then(function(response) {
				$scope.stations = response.stations;
			});
		}

		$scope.addStation = function () {
			var modalInstance = $uibModal.open({
	            templateUrl: '/app/modals/station/views/index.html',
                controller: 'AddStationController',
                size: 'lg',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                        	serie: true,
                            name: 'inspinia',
                            files: [
                                '/app/modals/station/controllers/AddStationController.js',
                            ]
                        });
                    }]
                }
	        });
		}

		$scope.editStation = function (stationId) {
			var modalInstance = $uibModal.open({
	            templateUrl: '/app/modals/station/views/index.html',
                controller: 'EditStationController',
                size: 'lg',
                resolve: {
                	stationId : function(){
                    	return stationId;
	                },
	                station: function(Restangular){
	                    return Restangular.one('/stations/'+stationId+'/edit').get();
	                },
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                        	serie: true,
                            name: 'inspinia',
                            files: [
                                '/app/modals/station/controllers/EditStationController.js',
                            ]
                        });
                    }]
                }
	        });
		}
    }
)