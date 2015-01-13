var gameApp = angular.module('gameApp');

gameApp.controller('playerController', ['$scope', 'gameData', 'playerService', 'programService', 'artificialIntelligenceService', function($scope, gameData, playerService, programService, artificialIntelligenceService) {
	$scope.gameData = gameData;
 	$scope.playerService = playerService;
	
	$scope.endTurn = function() {
		programService.clearProgram();
		playerService.setPlayerToNext();
		
		while (playerService.getCurrentPlayer().type === "computer") {
			artificialIntelligenceService.makeRandomProgram();
			programService.executeProgram();			
			programService.clearProgram();			
			playerService.setPlayerToNext();
		}	
	}
}]);