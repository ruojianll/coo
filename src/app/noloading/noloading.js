angular.module("coo").controller("noloading",function($scope,$state,$http,apiServ){
	 if(localStorage.getItem("name")==null||localStorage.getItem("name")==""){
		$scope.nologin="您暂未登录 ，";
		$scope.nologinNo="请登录"
	}else{
		$scope.nologin="您已登录 。";
		$scope.nologinNo=""
		apiServ.post('/api/account/login',{
			user_name:localStorage.name,
			password:localStorage.pwd
		}).then(
	        function(data){

	        	 $scope.$parent.user_name=data.user_name;

	            var user_id = data.id;
	            var token = data.web_token;
	            localStorage['user_id'] = user_id;
	            localStorage['web_token'] = token;
	            localStorage['name'] = data.user_name;
	            $state.go('wzy.machao.neto')

	        },
	        function(err){
	          console.log(err) 
	        }
	    )
	
		
	}
})
