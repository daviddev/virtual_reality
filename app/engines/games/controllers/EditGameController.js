angular.module('inspinia').controller('EditGameController',
	function($rootScope, $scope , Restangular , $state, $sce, $timeout, notify, gameId, game){

		$scope.action = 'edit';

		$scope.game = game.game;

		$scope.game.enabled = $scope.game.enabled==1 ? true : false;
		$scope.game.release_date = new Date($scope.game.release_date);

		$scope.trustAsHtml = function(string) {
		    return $sce.trustAsHtml(string);
		};

		$scope.createGame = function () {
			console.log($scope.game);
			Restangular.all('/games/'+gameId).customPUT($scope.game).then(function(response) {
				notify({ 
                    message: 'Success - Game has been successfully updated!',
                    classes: 'alert-info',
                    templateUrl: $rootScope.inspiniaTemplate
                });
				$state.go('app.games');
			}, function (errorResponse) {
				notify({ 
                    message: 'Whoops! - Something went wrong!',
                    classes: 'alert-danger',
                    templateUrl: $rootScope.inspiniaTemplate
                });
                $state.go('app.games');
			});
		}

		$scope.trustSrc = function(src) {
		    return $sce.trustAsResourceUrl(src);
		}

		$scope.$watch('game.video', function (newVal, oldVal) {
			$scope.videoPath = $sce.trustAsResourceUrl(newVal);
			// $timeout(function() {
			// 	var video = $('#video');
			// 	video.load();
			// 	video.play();
			// }, 1000);
			// angular.element('#player').play();
		})
    }
)