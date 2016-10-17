angular.module("coo").controller("noloading",function($scope){
	alert(localStorage.getItem("name"))
	if(localStorage.getItem("name")!=undefined){
		$scope.nologin="您以登录 。";
		$scope.nologinNo=""
	}else{
		$scope.nologin="您暂未登录 ，";
		$scope.nologinNo="请登录"
	}
})
