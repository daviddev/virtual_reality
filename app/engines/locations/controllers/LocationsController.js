angular.module('inspinia').controller('LocationsController',
	function($scope , $rootScope, Restangular , $state, locations, DTOptionsBuilder, $uibModal, notify){
    	$scope.locations = locations.locations;

    	$scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([]);

        $scope.selectLocation = function (location) {
            localStorage.location = location;
            $rootScope.selectedLocation = location;
            $state.go('app.dashboard');
        }

        $rootScope.locationPush = function (location) {
        	$scope.locations.push(location);
        }

        $rootScope.locationEdit = function (location) {
        	angular.forEach($scope.locations, function (value, key) {
        		if (value.id == location.id) {
        			$scope.locations[key] = location;
        		}
        	});
        }

        $scope.deleteLocation = function (locationId) {
        	Restangular.one('/locations/'+locationId).remove().then(function (response) {
        		var locations = [];
        		angular.forEach($scope.locations, function (value, key) {
	        		if (value.id != locationId) {
	        			locations.push(value);
	        		}
	        	});
	        	$scope.locations = locations;

        		notify({ 
                    message: 'Success - Location has been successfully deleted!',
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
        }

        $scope.createLocation = function () {
			var modalInstance = $uibModal.open({
	            templateUrl: '/app/modals/location/views/index.html',
                controller: 'AddLocationController',
                size: 'lg',
                resolve: {
                    companies: function(Restangular, $stateParams, $state){
                        return Restangular.one('/companies').get({dashboard: true});
                    },
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                        	serie: true,
                            name: 'inspinia',
                            files: [
                                '/app/modals/location/controllers/AddLocationController.js',
                            ]
                        });
                    }]
                }
	        });
		}

		$scope.editLocation = function (locationId) {
			var modalInstance = $uibModal.open({
	            templateUrl: '/app/modals/location/views/edit.html',
                controller: 'EditLocationController',
                size: 'lg',
                resolve: {
                	location: function(Restangular, $stateParams, $state){
	                    return Restangular.one('/locations/'+locationId).get();
	                },
	                locationId: function() {
	                    return locationId;
	                },
                    companies: function(Restangular, $stateParams, $state){
                        return Restangular.one('/companies').get({dashboard: true});
                    },
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                        	serie: true,
                            name: 'inspinia',
                            files: [
                                '/app/modals/location/controllers/EditLocationController.js',
                            ]
                        });
                    }]
                }
	        });
		}
	}
)