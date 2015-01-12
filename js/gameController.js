var gameApp = angular.module('gameApp');

gameApp.controller('gameController', ['$scope', '$timeout', 'mapService', 'mapData', 'playerService', 'gameData', function($scope, $timeout, mapService, mapData, playerService, gameData) {
 
	$scope.lastUpdated = new Date();

	$scope.renderCanvas = function() {

		var TILE_WIDTH = 40;
		var TILE_HEIGHT = 40;
					
		$scope.clearCanvas();
					
		for (var i = 0; i < gameData.robots.length; i++) {
			var robot = gameData.robots[i];
			$scope.writeTextToCanvas(robot.position.x + ',' + robot.position.y + ', ' + robot.player + ' robot', robot.position.x * TILE_WIDTH, robot.position.y * TILE_HEIGHT);
		}
		
		for (var i = 0; i < gameData.flags.length; i++) {
			var flag = gameData.flags[i];
			$scope.writeTextToCanvas(flag.player + ' flag', flag.position.x * TILE_WIDTH, flag.position.y * TILE_HEIGHT);
		}
		
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
	
	$scope.writeTextToCanvas = function(text, x, y) {		
		var context = $scope.getContext();
		context.font = '12pt Arial';
		context.fillStyle = '#fff';
		context.fillText(text, x, y);
	}
	
	$scope.update = function() {
		var framesPerSecond = 10;
		
		var now = new Date();
		var timeSinceLastUpdate = now.getTime() - $scope.lastUpdated.getTime();
						
		$scope.renderCanvas();
		
		$scope.lastUpdated = now;		
		$timeout($scope.update, 1000 / framesPerSecond);
	}
		
	$scope.init = function() {
		playerService.addPlayer('Human', '#ff0000');
		playerService.addPlayer('A.I.', '#0000ff');
		$scope.update();
	}
	
	$scope.init();	
	
}]);