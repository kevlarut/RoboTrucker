var gameApp = angular.module('gameApp');

gameApp.service('mapService', function(mathService, gameData, mapData) {
		
	this.findAnEmptySpotInTheMap = function() {
		var position = {};
		do {
			position.x = mathService.random(0,mapData.width - 1);
			position.y = mathService.random(0, mapData.height - 1);
			position.z = 0;
		} while (!this.isTileEmptyAndWithinBounds(position));
		
		return position;
	}
	
	this.isThereAFlagInThisTile = function(playerId, position) {
		for (var i = 0; i < gameData.flags.length; i++) {
			var flag = gameData.flags[i];
			if (flag.position.x == position.x && flag.position.y == position.y && flag.player !== playerId) {
				return true;
			}
		}
		
		return false;
	}
	
	this.isTileEmptyAndWithinBounds = function(position) {
	
		if (position.y < 0 || position.y >= mapData.height) {
			return false;
		}		
		if (position.x < 0 || position.x >= mapData.width) {
			return false;
		}
		
		for (var i = 0; i < gameData.robots.length; i++) {
			var robot = gameData.robots[i];
			if (robot.position == position) {
				return false;
			}
		}		
		for (var i = 0; i < gameData.flags.length; i++) {
			var flag = gameData.flags[i];
			if (flag.position == position) {
				return false;
			}
		}
		
		return true;
		
	}
	
});