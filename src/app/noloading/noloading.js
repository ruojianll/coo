angular.module("coo").controller("noloading",function($scope){
	 if(localStorage.getItem("name")==null||localStorage.getItem("name")==""){
		$scope.nologin="您暂未登录 ，";
		$scope.nologinNo="请登录"
	}else{
		$scope.nologin="您已登录 。";
		$scope.nologinNo=""
	}
})
