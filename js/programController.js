var gameApp = angular.module('gameApp');

gameApp.controller('programController', ['$scope', '$timeout', 'programService', 'gameData', 'mapService', function($scope, $timeout, programService, gameData, mapService) {
 	
	$scope.HUMAN_PLAYER_INDEX = 0;
	$scope.programService = programService;
	
	$scope.executeProgram = function() {
		for (var i = 0; i < programService.program.length; i++) {
			var command = programService.program[i];
			switch (command.id) {
				case 'input':
					console.log("ERROR: input not implemented!");
					break;
				case 'output':
					console.log("ERROR: output not implemented!");
					break;
				case 'right':
					console.log("ERROR: right not implemented!");
					break;
				case 'left':
					console.log("ERROR: left not implemented!");
					break;
				case 'forward':
					$scope.forward(gameData.robots[$scope.HUMAN_PLAYER_INDEX]);
					break;
				default:
					console.log('ERROR in programController.executeProgram: Command "' + command.id + '" is not defined!');
					break;
			}
		}
	}
	
	$scope.forward = function(robot) {
		
		var destination = {
			x: robot.position.x,
			y: robot.position.y
		};
	
		switch (robot.facing) {
			case 'UP':
				destination.y--;
				break;
			case 'DOWN':
				destination.y++;
				break;
			case 'LEFT':
				destination.x--;
				break;
			case 'RIGHT':
				destination.x++;
				break;
			default:
				return false;				
		}
		
		if (mapService.isTileEmptyAndWithinBounds(destination)) {
			robot.position = destination;
			return true;
		}
		
		return false;
	}
	
}]);