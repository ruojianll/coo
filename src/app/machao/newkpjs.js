
angular.module('coo').controller('MainController',function($scope,$http){
	$scope.data={}
	$scope.fn=function(){
		$http({
			method:"POST",
			url:"http://10.115.19.223:8091/api/board/all",
			data:$.param($scope.data),
			headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}
		}).success(function(data){
			var ma='<div class="ma-jiayi">新信息版</div>'
			$('.jakuandi').append(ma)
		})
		
	}
	$scope.fn2=function(){
		$http({
			method:"POST",
			url:"http://10.115.19.223:8091/api/board/all",
			data:$.param($scope.data),
			headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}
		}).success(function(data){
			var chao='<div class="ma-jiayi">新信息版</div>'
			$('.jakuaner').append(chao)
		})
		
			
		
	}
})


