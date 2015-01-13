var gameApp = angular.module('gameApp');

gameApp.controller('playerController', ['$scope', 'gameData', 'playerService', 'programService', function($scope, gameData, playerService, programService) {
	$scope.gameData = gameData;
 	$scope.playerService = playerService;
	
	$scope.endTurn = function() {
		programService.clearProgram();
		playerService.setPlayerToNext();
	}
}]);