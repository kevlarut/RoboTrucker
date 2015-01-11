var gameApp = angular.module('gameApp');

gameApp.controller('gameController', ['$scope', '$timeout', 'mapService', 'mapData', function($scope, $timeout, mapService, mapData) {
 
	$scope.mapData = mapData;
 
	$scope.lastUpdated = new Date();
	
	$scope.update = function() {		
		var framesPerSecond = 20;
		
		var now = new Date();
		var timeSinceLastUpdate = now.getTime() - $scope.lastUpdated.getTime();
								
		$scope.lastUpdated = now;		
		$timeout($scope.update, 1000 / framesPerSecond);
	}
		
	$scope.init = function() {
		mapService.generateMap();
		$scope.update();
	}
	
	$scope.init();	
	
}]);