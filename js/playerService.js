var gameApp = angular.module('gameApp');

gameApp.service('playerService', function(gameData, mapService, mathService) {

	this.addPlayer = function(id, color, truckSrc, flagSrc) {
		
		var player = {
			color: color,
			id: id
		};
		gameData.players.push(player);		
		
		var flag = {
			color: color,
			image: flagSrc,
			player: id,
			position: mapService.findAnEmptySpotInTheMap()
		};
		gameData.flags.push(flag);		
		
		var directions = ['UP','DOWN','LEFT','RIGHT'];
		var direction = directions[mathService.random(0,3)];
		var robot = {
			color: color,
			image: truckSrc,
			player: id,
			position: mapService.findAnEmptySpotInTheMap(),
			facing: direction
		};
		gameData.robots.push(robot);
		
	}
	
});