var gameApp = angular.module('gameApp');

gameApp.service('cardData', function() {
		
	this.cards = [
		{
			id: 'input',
			title: 'Load Input'
		},
		{
			id: 'right',
			title: 'Turn Right'
		},
		{
			id: 'left',
			title: 'Turn Left'
		},
		{
			id: 'forward',
			title: 'Move Forward'
		},
	];
	
});

