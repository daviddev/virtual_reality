angular.module('inspinia').controller('AddGameController',
	function($rootScope, $scope , Restangular , $state, $sce, $timeout, notify){

		$scope.action = 'add';

		$scope.videoPath = '';

		$scope.game = {
			description: '',
			video: '',
			release_date: new Date(),
			enabled: false
		};

		$scope.trustAsHtml = function(string) {
		    return $sce.trustAsHtml(string);
		};

		$scope.createGame = function () {
			$scope.game.location_id = $rootScope.selectedLocation;

			Restangular.all('/games').post($scope.game).then(function(response) {
				notify({ 
                    message: 'Success - Game has been successfully created!',
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