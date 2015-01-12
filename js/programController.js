var gameApp = angular.module('gameApp');

gameApp.controller('programController', ['$scope', '$timeout', 'programService', function($scope, $timeout, programService) {
 	
	$scope.programService = programService;
	
	$scope.executeProgram = function() {
		console.log('ERROR: programController.executeProgram is not implemented!');
	}
	
}]);