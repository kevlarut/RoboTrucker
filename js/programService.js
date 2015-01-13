var gameApp = angular.module('gameApp');

gameApp.service('programService', function() {

	this.MAX_PROGRAM_LENGTH = 5;
	this.program = [];
	
	this.clearProgram = function() {
		this.program = [];
	}
	
	this.enqueueCard = function(card) {
		if (this.program.length >= this.MAX_PROGRAM_LENGTH) {
			return false;
		}
		else {
			this.program.push(card);
			return true;
		}
	}
	
});