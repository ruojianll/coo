angular.module('coo').controller('card_lpl',function($scope,$http,accountServ,$log){
//	"$scope.data={'文本','时间','选择框','@','图片'};"
	
	accountServ.time_hours($scope,$log);
	

})
