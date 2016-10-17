angular.module('ui.bootstrap').controller('AlertDemoCtrl', function ($scope) {
$scope.alerts = [

];

  $scope.addAlert = function() {
    $scope.alerts.push({msg: ''});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
});