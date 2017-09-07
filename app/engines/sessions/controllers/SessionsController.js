angular.module('inspinia').controller('SessionsController',
	function ($scope , Restangular , $state, sessions) {
		$scope.activeSessions = sessions.activeSessions;
		$scope.historySessions = sessions.historySessions;
})