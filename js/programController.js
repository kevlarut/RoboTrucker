var gameApp = angular.module('gameApp');

gameApp.controller('programController', ['$scope', '$timeout', 'programService', 'gameData', 'mapService', function($scope, $timeout, programService, gameData, mapService) {
 	
	$scope.HUMAN_PLAYER_INDEX = 0;
	$scope.programService = programService;
	
	$scope.executeProgram = function() {
	
		var robot = gameData.robots[$scope.HUMAN_PLAYER_INDEX];
		for (var i = 0; i < programService.program.length; i++) {
			var command = programService.program[i];
			switch (command.id) {
				case 'input':
					$scope.input(robot);
					break;
				case 'right':
					$scope.right(robot);
					break;
				case 'left':
					$scope.left(robot);
					break;
				case 'forward':
					$scope.forward(robot);
					break;
				default:
					console.log('ERROR in programController.executeProgram: Command "' + command.id + '" is not defined!');
					break;
			}
		}
	}
	
	$scope.input = function(robot) {
		if (mapService.isThereAFlagInThisTile(robot.player, robot.position)) {
			alert('You have captured your opponent\'s flag.  You win!');
			return true;
		}
		
		return false;
	}
	
	$scope.left = function(robot) {
		switch (robot.facing) {
			case 'UP':
				robot.facing = 'LEFT';
				break;
			case 'DOWN':
				robot.facing = 'RIGHT';
				break;
			case 'LEFT':
				robot.facing = 'DOWN';
				break;
			case 'RIGHT':
				robot.facing = 'UP';
				break;
			default:
				return false;				
		}
	}
	
	$scope.right = function(robot) {
		switch (robot.facing) {
			case 'UP':
				robot.facing = 'RIGHT';
				break;
			case 'DOWN':
				robot.facing = 'LEFT';
				break;
			case 'LEFT':
				robot.facing = 'UP';
				break;
			case 'RIGHT':
				robot.facing = 'DOWN';
				break;
			default:
				return false;				
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