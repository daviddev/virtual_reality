angular.module('inspinia').controller('GamesController',
	function($rootScope, $scope , Restangular , $state, games, notify, $sce){
		$scope.games = games.games;

		$scope.trustAsHtml = function(string) {
		    return $sce.trustAsHtml(string);
		};

		$scope.deleteGame = function (gameId) {
			Restangular.one('/games/'+gameId).remove().then(function (response) {
        		var games = [];
        		angular.forEach($scope.games, function (value, key) {
	        		if (value.id != gameId) {
	        			games.push(value);
	        		}
	        	});
	        	$scope.games = games;

        		notify({ 
                    message: 'Success - Game has been successfully deleted!',
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
    }
)