angular.module('coo').controller('card', function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  }
});