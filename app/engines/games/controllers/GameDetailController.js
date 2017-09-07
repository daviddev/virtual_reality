angular.module('inspinia').controller('GameDetailController',
	function($scope , Restangular , $state, $sce, game, gameId){
		$scope.game = game.game;

		$scope.game.enabled = $scope.game.enabled==1 ? true : false;

		$scope.trustSrc = function(src) {
		    return $sce.trustAsResourceUrl(src);
		}

		$scope.changeStatus = function(status) {
			Restangular.all('/games/'+gameId).customPUT({enabled: status});
		}

		$scope.trustAsHtml = function(string) {
		    return $sce.trustAsHtml(string);
		};
    }
)