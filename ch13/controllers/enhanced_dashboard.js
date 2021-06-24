angular.module('dashboardApp')
  .controller('dashboardController',
	      ['$scope', function ($scope) {
		$scope.items = [
		  { Name: 'Mike', Value: 49 },
		  { Name: 'Marcia', Value: 52 },
		  { Name: 'Mikael', Value: 18 }
		];
		$scope.selectedItem = $scope.items[0];
	      }]);
