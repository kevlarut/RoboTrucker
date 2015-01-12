var gameApp = angular.module('gameApp');

gameApp.controller('cardController', ['$scope', '$timeout', 'cardData', 'programService', function($scope, $timeout, cardData, programService) {
 	
	$scope.cardData = cardData;
	
	$scope.useCard = function(card) {
		programService.enqueueCard(card);
	}
	
}]);