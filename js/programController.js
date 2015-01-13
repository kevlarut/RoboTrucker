var gameApp = angular.module('gameApp');

gameApp.controller('programController', ['$scope', '$timeout', 'programService', 'gameData', 'mapService', 'playerService', function($scope, $timeout, programService, gameData, mapService, playerService) {
 	
	$scope.programService = programService;
	
	$scope.executeProgram = function() {
		programService.executeProgram();
	}
	
}]);