var gameApp = angular.module('gameApp');

gameApp.service('gameData', function() {		
	this.players = [];
	this.flags = [];
	this.robots = [];	
});

