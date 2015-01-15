var gameApp = angular.module('gameApp');

gameApp.controller('gameController', ['$scope', '$timeout', 'playerService', 'gameData', function($scope, $timeout, playerService, gameData) {
 
	$scope.lastUpdated = new Date();

	$scope.renderCanvas = function() {
		
		var SCALE = 80;
		
		var canvas = document.getElementById("gameCanvas");
		var context = document.getElementById("gameCanvas").getContext('2d');
		var iso = new Isomer(canvas, { scale: SCALE });
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		var objectsToDraw = [];
		
		// Draw the floor
		for (var y = 0; y < 10; y++) {
			for (var x = 0; x < 10; x++) {				
				var point = Isomer.Point(y,x,-0.1);
				var shape = Isomer.Shape.Prism(point, 0.9, 0.9, 0.1);
				var color = new Isomer.Color(100, 110, 120);
				var object = {
					point: point,
					shape: shape,
					color: color
				};
				objectsToDraw.push(object);
			}
		}
		
		// Draw the robots
		for (var i = 0; i < gameData.robots.length; i++) {
			var robot = gameData.robots[i];
			
			var point = Isomer.Point(robot.position.x, robot.position.y, robot.position.z);
			// var shape = Isomer.Shape.Prism(point);
			// var color = new Isomer.Color(robot.color.r, robot.color.g, robot.color.b);						
			// var object = {
				// point: point,
				// shape: shape,
				// color: color
			// };			
			// objectsToDraw.push(object);
			
			var object = $scope.getRobotObjectToDraw(robot, point, SCALE);			
			objectsToDraw.push(object);
		}
		
		// Draw the flags
		for (var i = 0; i < gameData.flags.length; i++) {
			var flag = gameData.flags[i];
			
			var point = Isomer.Point(flag.position.x, flag.position.y, flag.position.z);
			var shape = Isomer.Shape.Prism(point, 0.5, 0.5, 0.5);
			var color = new Isomer.Color(flag.color.r, flag.color.g, flag.color.b);
			var object = {
				point: point,
				shape: shape,
				color: color
			};
			objectsToDraw.push(object);
		}
		
		var sortedObjectsToDraw = objectsToDraw.sort(function (a, b) {
			var valueA = a.point.x + a.point.y - a.point.z;
			var valueB = b.point.x + b.point.y - b.point.z;
		
			if (valueA > valueB) {
				return -1;
			}
			else if (valueA < valueB) {
				return 1;
			}
			else {
				return 0;
			}
		});
			
		for (var i = 0; i < sortedObjectsToDraw.length; i++) {
			var object = sortedObjectsToDraw[i];
			if (typeof object.image !== 'undefined') {
				var xy = $scope.getXYForLiteralImage(object.point, SCALE, canvas);
				var x = xy.x;
				var y = xy.y;
				var image = new Image();
				image.src = object.image.src;
				context.drawImage(
					image, 
					object.image.sourceX, 
					object.image.sourceY, 
					object.image.width, 
					object.image.height, 
					x, 
					y, 
					object.image.width, 
					object.image.height);
			}
			else {
				iso.add(object.shape, object.color);
			}
		}
	}
	
	$scope.getXYForLiteralImage = function(point, SCALE, canvas) {
		
		var isomerAngle = Math.PI / 6;
		var isomerScale = SCALE;
		var isomerOriginX = canvas.width / 2;
		var isomerOriginY = canvas.height * 0.9
			
		var transformation = [
			[
			  isomerScale * Math.cos(isomerAngle),
			  isomerScale * Math.sin(isomerAngle)
			],
			[
			  isomerScale * Math.cos(Math.PI - isomerAngle),
			  isomerScale * Math.sin(Math.PI - isomerAngle)
			]
		];
			
		var xMap = {
			x: point.x * transformation[0][0],
			y: point.x * transformation[0][1]
		};

		var yMap = {
			x: point.y * transformation[1][0],
			y: point.y * transformation[1][1]
		};

		var x = isomerOriginX + xMap.x + yMap.x;
		var y = isomerOriginY - xMap.y - yMap.y - (point.z * isomerScale);
			
		x -= isomerScale / 2;
		y -= isomerScale * 1.1;
		
		return {
			x: x,
			y: y
		};
	}
	
	$scope.getRobotObjectToDraw = function(robot, point, scale) {	

		var sourceX = 0;
		var sourceY = 0;	
		
		var rotation = 0;
		switch (robot.facing) {
			case 'UP':
				sourceX = 3 * scale;
				break;
			case 'RIGHT':
				sourceX = 0 * scale;
				break;
			case 'DOWN':
				sourceX = 1 * scale;
				break;
			case 'LEFT':
				sourceX = 2 * scale;
				break;
		}
		
		var playerIndex = 0;
		for (var i = 0; i < gameData.players.length; i++) {
			var player = gameData.players[i];
			if (player.id === robot.player) {
				playerIndex = i;
				break;
			}
		}
		sourceY = playerIndex * scale;
		
		var object = {
			point: point,
			image: {					
				src: 'img/trucks.png', 
				sourceX: sourceX, 
				sourceY: sourceY, 
				width: scale, 
				height: scale, 
				width: scale, 
				height: scale
			}
		};
			
		return object;
	}
	
	$scope.drawImage = function(src, x, y) {
		var context = $scope.getContext();
		var image = new Image();
		image.src = src;
		context.drawImage(image, x, y);
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
					
		$scope.renderCanvas();
		
		$scope.lastUpdated = now;		
		$timeout($scope.update, 1000 / framesPerSecond);
	}

	$scope.init = function() {
		var blue = {
			r: 50,
			g: 60,
			b: 160
		};
		var red = {
			r: 160,
			g: 60,
			b: 50
		};
		playerService.addPlayer('Joe the Human', 'human', red, 'img/truck-red.gif', 'img/flag-red.gif');
		playerService.addPlayer('A.I.', 'computer', blue, 'img/truck-blue.gif', 'img/flag-blue.gif');
		playerService.setCurrentPlayerByIndex(0);
		$scope.update();
	}
	
	$scope.init();	
	
}]);