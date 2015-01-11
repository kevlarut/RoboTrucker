var gameApp = angular.module('gameApp');

gameApp.service('mapService', function(mathService, mapData) {
		
	this.findAnEmptySpotInTheMap = function() {
		var x, y;
		do {
			x = mathService.random(0,mapData.width - 1);
			y = mathService.random(0, mapData.height - 1);
		} while (mapData.map[y][x] != "Empty");
		
		return {
			x : x,
			y : y
		};
	}
	
	this.placeAtAnEmptyPosition = function(cellContents) {
		var position = this.findAnEmptySpotInTheMap();
		mapData.map[position.y][position.x] = cellContents;
	}
	
	this.generateMap = function() {
		var map = [[]];
		for (var row = 0; row < mapData.height; row++) {
			map[row] = [];
			for (var col = 0; col < mapData.width; col++) {
				map[row][col] = "Empty";
			}
		}

		mapData.map = map;
		
		this.placeAtAnEmptyPosition("Red Flag");
		this.placeAtAnEmptyPosition("Red Robot");
		this.placeAtAnEmptyPosition("Blue Flag");
		this.placeAtAnEmptyPosition("Blue Robot");
		
	}
	
});