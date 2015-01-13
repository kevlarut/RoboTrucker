var gameApp = angular.module('gameApp');

gameApp.service('programService', function(playerService, gameData, mapService) {

	this.MAX_PROGRAM_LENGTH = 5;
	this.program = [];
	
	this.clearProgram = function() {
		this.program = [];
	}
	
	this.enqueueCard = function(card) {
		if (this.program.length >= this.MAX_PROGRAM_LENGTH) {
			return false;
		}
		else {
			this.program.push(card);
			return true;
		}
	}
	
	this.executeProgram = function() {
		var robot = gameData.robots[playerService.getCurrentPlayerIndex()];
		for (var i = 0; i < this.program.length; i++) {
			var command = this.program[i];
			switch (command.id) {
				case 'input':
					this.input(robot);
					break;
				case 'right':
					this.right(robot);
					break;
				case 'left':
					this.left(robot);
					break;
				case 'forward':
					this.forward(robot);
					break;
				default:
					console.log('ERROR in programController.executeProgram: Command "' + command.id + '" is not defined!');
					break;
			}
		}
	}
	
	this.input = function(robot) {
		if (mapService.isThereAFlagInThisTile(robot.player, robot.position)) {
			alert('You have captured your opponent\'s flag.  You win!');
			return true;
		}
		
		return false;
	}
	
	this.left = function(robot) {
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
	
	this.right = function(robot) {
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
	
	this.forward = function(robot) {
		
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
	
});