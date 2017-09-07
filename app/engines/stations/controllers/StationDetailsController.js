angular.module('inspinia').controller('StationDetailsController',
	function($rootScope, $scope , Restangular , $state, stationId, station, notify, $uibModal){
		$scope.station = station.station;

		$scope.assignCustomer = function (stationId) {
            $scope.modalInstance = $uibModal.open({
	            templateUrl: '/app/modals/station/views/assign.html',
                controller: 'AssignController',
                resolve: {
                	customers: function (Restangular, $stateParams, $state) {
                		return Restangular.one('/customers').get();
                	},
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                        	serie: true,
                            name: 'inspinia',
                            files: [
                                '/app/modals/station/controllers/AssignController.js',
                            ]
                        });
                    }]
                }
	        });
        }

        $rootScope.selectCustomer = function (customerId) {
            Restangular.all('/stations/'+stationId)
                        .customPUT({assign:true, customer_id:customerId})
                        .then(function (response) {
                        	$scope.station = response.station;
                            notify({ 
                                message: 'Success - Customer has been successfully assigned!',
                                classes: 'alert-info',
                                templateUrl: $rootScope.inspiniaTemplate
                            });
                            $scope.modalInstance.dismiss('cancel');
                        }, function (errorResponse) {
                            notify({ 
                                message: 'Whoops! - Something went wrong!',
                                classes: 'alert-danger',
                                templateUrl: $rootScope.inspiniaTemplate
                            });
                            $scope.modalInstance.dismiss('cancel');
                        });
        }

        $scope.loginCustomer = function (stationId) {
            var data = {
                station_id: stationId,
                type: 'login',
                message: ''
            };
            Restangular.all('/commands').post(data).then(function (response) {
                notify({ 
                    message: 'Success - Command has been successfully added!',
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

        $scope.launchGame = function (stationId) {
            $scope.modalInstanceLaunch = $uibModal.open({
	            templateUrl: '/app/modals/station/views/launch.html',
                controller: 'LaunchController',
                resolve: {
                	games: function (Restangular, $stateParams, $state) {
                		return Restangular.one('/games').get();
                	},
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                        	serie: true,
                            name: 'inspinia',
                            files: [
                                '/app/modals/station/controllers/LaunchController.js',
                            ]
                        });
                    }]
                }
	        });
        }

        $rootScope.selectGame = function (gameId) {
            var data = {
                station_id: stationId,
                type: 'launch',
                message: gameId
            };
            Restangular.all('/commands').post(data).then(function (response) {
                notify({ 
                    message: 'Success - Command has been successfully added!',
                    classes: 'alert-info',
                    templateUrl: $rootScope.inspiniaTemplate
                });
                $scope.modalInstanceLaunch.dismiss('cancel');
            }, function (errorResponse) {
                notify({ 
                    message: 'Whoops! - Something went wrong!',
                    classes: 'alert-danger',
                    templateUrl: $rootScope.inspiniaTemplate
                });
                $scope.modalInstanceLaunch.dismiss('cancel');
            });
        }

    }
)