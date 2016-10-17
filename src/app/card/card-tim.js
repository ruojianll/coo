angular.module('ui.bootstrap').controller('DatepickerDemoCtrl', function ($scope) {
$scope.today = function() {
    $scope.dt = new Date();
}
   
});