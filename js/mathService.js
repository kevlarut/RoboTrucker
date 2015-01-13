var gameApp = angular.module('gameApp');

gameApp.service('mathService', function() {
		
	this.getRandomElement = function(array) {
		var index = this.random(0, array.length - 1);
		return array[index];
	}
		
	this.random = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
});