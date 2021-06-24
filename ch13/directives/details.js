angular.module('dashboardApp')
  .directive('detailsView', function () {
    return {
      restrict: 'E',
      scope: { data: "=" },
      templateUrl: 'templates/static_item.html'
    };
  });
