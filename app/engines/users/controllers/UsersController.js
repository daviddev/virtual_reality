angular.module('inspinia').controller('UsersController',
	function ($scope , Restangular , $state, users, locations, companies, $timeout, notify, $rootScope, $uibModal) {
		$rootScope.users = users;
		$scope.deleteUser = function (id) {
			Restangular.one('/users/' + id).remove().then(function (response) {
        		var users = [];
        		angular.forEach($scope.users, function (value, key) {
	        		if (value.id != id) {
	        			users.push(value);
	        		}
	        	});
	        	$rootScope.users = users;

        		notify({ 
                    message: 'Success - User has been successfully deleted!',
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
		$scope.editUser = function (user) {
            var modalInstance = $uibModal.open({
                templateUrl: '/app/modals/users/views/index.html',
                controller: 'AddUserController',
                size: 'lg',
                resolve: {
                    user: function () {
                        return user;
                    },
                    locations: function () {
                    	return locations.locations;
                    },
					companies: function () {
						return companies.companies;
					},
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'ui.select2',
                                files: ['bower_components/select2/select2.css', 'bower_components/angular-ui-select2/src/select2.js', 'bower_components/select2/select2.js']
                            }
                        ]);
                    },
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            name: 'inspinia',
                            files: [
                                '/app/modals/users/controllers/AddUserController.js',
                            ]
                        });
                    }]
                }
            });
		};

		$scope.addUser = function () {
            var modalInstance = $uibModal.open({
                templateUrl: '/app/modals/users/views/index.html',
                controller: 'AddUserController',
                size: 'lg',
                resolve: {
                    user: function () {
                        return {
                            role: 'super-admin'
                        };
                    },
                    locations: function () {
                    	return locations.locations;
                    },
					companies: function () {
						return companies.companies;
					},
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'ui.select2',
                                files: ['bower_components/select2/select2.css', 'bower_components/angular-ui-select2/src/select2.js', 'bower_components/select2/select2.js']
                            }
                        ]);
                    },
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            name: 'inspinia',
                            files: [
                                '/app/modals/users/controllers/AddUserController.js',
                            ]
                        });
                    }]
                }
            });
		};
	}
)