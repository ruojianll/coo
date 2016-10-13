//angular.module('coo')
//.controller('date_con',function($scope){
//	 $scope.today = function() {
//	 	
//	  $scope.dt = new Date();
//	  console.log($scope.dt)
//	  };
//	  $scope.today();
//	  $scope.items=['文本','时间','选择框','@','图片']
//	  
//})
angular.module('coo').controller('date_con', function ($scope, $log) {
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