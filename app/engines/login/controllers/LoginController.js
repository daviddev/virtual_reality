angular.module('inspinia').controller('LoginController',
	function($scope , Restangular , $state){
		$scope.hideError = function () {
			$scope.error = false;
		}

		$scope.login = function () {
			var data = {
				email: $scope.email,
				password: $scope.password
			};
			Restangular.all("/login").post(data).then(function (response) {
				if (response.token) {
					localStorage.token = response.token;
    				Restangular.setDefaultHeaders({Authorization: "Bearer " + localStorage.token,
                                           		   "X-Requested-With": "XMLHttpRequest"});
					$state.go('app.dashboard');
				}
				
			}, function (error) {
				$scope.error = true;
			});
		}
    }
)