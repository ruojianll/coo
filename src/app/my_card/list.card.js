angular.module('coo').controller('list_con', function ($scope, $log) {
  $scope.items=['文本','时间','选择框','@','图片']

  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

  //$scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
});