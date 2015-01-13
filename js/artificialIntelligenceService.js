var gameApp = angular.module('gameApp');

gameApp.service('artificialIntelligenceService', function(cardData, programService, mathService) {

	this.makeRandomProgram = function() {
		for (var i = 0; i < programService.MAX_PROGRAM_LENGTH; i++) {
			var card = mathService.getRandomElement(cardData.cards);
			programService.enqueueCard(card);
		}
	}
	
});