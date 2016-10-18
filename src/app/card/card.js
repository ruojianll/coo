angular.module('coo')
.controller('card', function ($scope) {
	$scope.alerts = [];

	$scope.addAlert = function() {
		$scope.alerts.push({msg: ''});
	};
	
	$scope.closeAlert = function(index) {
	    $scope.alerts.splice(index, 1);
	};
	
//	$scope.fn=function(){
//		var str='<div class="card-inp1"  id="inp1"><input type="text" placeholder="新文本" class="txt"></div>';
//		$('.card-pic').append(str);
//	};
	
	
})


