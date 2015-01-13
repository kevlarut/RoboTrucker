var gameApp = angular.module('gameApp');

gameApp.controller('gameController', ['$scope', '$timeout', 'mapService', 'mapData', 'playerService', 'gameData', function($scope, $timeout, mapService, mapData, playerService, gameData) {
 
	$scope.angle = 0;
	$scope.lastUpdated = new Date();

	$scope.renderCanvas = function() {

		var TILE_WIDTH = 40;
		var TILE_HEIGHT = 40;
					
		$scope.clearCanvas();
					
		for (var i = 0; i < gameData.robots.length; i++) {
			var robot = gameData.robots[i];
			$scope.drawRobot(robot);
		}
		
		for (var i = 0; i < gameData.flags.length; i++) {
			var flag = gameData.flags[i];
			$scope.drawImage(flag.image, flag.position.x * TILE_WIDTH, flag.position.y * TILE_HEIGHT);
		}
		
	}
	
	$scope.drawRobot = function(robot) {	

		var TILE_WIDTH = 40;
		var TILE_HEIGHT = 40;
		
		var rotation = 0;
		switch (robot.facing) {
			case 'RIGHT':
				rotation = 90;
				break;
			case 'DOWN':
				rotation = 180;
				break;
			case 'LEFT':
				rotation = 270;
				break;
		}
		$scope.drawRotatedImage(robot.image, robot.position.x * TILE_WIDTH, robot.position.y * TILE_HEIGHT, rotation);
	}
	
	$scope.drawImage = function(src, x, y) {
		var context = $scope.getContext();
		var image = new Image();
		image.src = src;
		context.drawImage(image, x, y);
	}
	
	$scope.drawRotatedImage = function(src, x, y, rotationDegrees) {
	
		var image = new Image();
		image.src = src;
		
		var angle = $scope.angle;
		var canvas = document.getElementById('gameCanvas');
		var context = canvas.getContext('2d');
		context.save();
		var transX = (image.width / 2) + x;
		var transY = (image.height / 2) + y;
		context.translate(transX, transY);
		var deg = rotationDegrees;
		var rad = deg * Math.PI / 180;
		context.rotate(rad);
		context.translate(0 - transX, 0 - transY);
		context.drawImage(image, x, y);		
		context.restore();
	}
	
	$scope.clearCanvas = function() {
		var canvas = document.getElementById('gameCanvas');
		var context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
	
	$scope.getContext = function() {
		var canvas = document.getElementById('gameCanvas');
		var context = canvas.getContext('2d');
		return context;
	}
	
	$scope.update = function() {
		var framesPerSecond = 10;
		
		var now = new Date();
		var timeSinceLastUpdate = now.getTime() - $scope.lastUpdated.getTime();
					
		$scope.angle++;
		$scope.renderCanvas();
		
		$scope.lastUpdated = now;		
		$timeout($scope.update, 1000 / framesPerSecond);
	}
		
	$scope.init = function() {
		playerService.addPlayer('Joe the Human', 'human', '#ff0000', 'img/truck-red.gif', 'img/flag-red.gif');
		playerService.addPlayer('A.I.', 'computer', '#0000ff', 'img/truck-blue.gif', 'img/flag-blue.gif');
		playerService.setCurrentPlayerByIndex(0);
		$scope.update();
	}
	
	$scope.init();	
	
}]);