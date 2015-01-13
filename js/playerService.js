var gameApp = angular.module('gameApp');

gameApp.service('playerService', function(gameData, mapService, mathService) {

	this.currentPlayer = null;
	
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

	this.getCurrentPlayerIndex = function() {
		var currentPlayerIndex = null;
		for (var i = 0; i < gameData.players.length; i++) {
			var player = gameData.players[i];
			if (player.id == this.currentPlayer) {
				currentPlayerIndex = i;
				break;
			}
		}
		return currentPlayerIndex;
	}
		
	this.setCurrentPlayer = function(id) {
		this.currentPlayer = id;
	}
	
	this.setCurrentPlayerByIndex = function(index) {
		this.currentPlayer = gameData.players[index].id;
	}
	
	this.setPlayerToNext = function() {
		var currentPlayerIndex = this.getCurrentPlayerIndex();
		
		if (currentPlayerIndex + 1 >= gameData.players.length) {
			this.setCurrentPlayerByIndex(0);
		}
		else {
			this.setCurrentPlayerByIndex(currentPlayerIndex + 1);
		}
	}
	
});