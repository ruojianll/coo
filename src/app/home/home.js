angular.module("coo").controller("won",function($scope,$state,$stateParams){
	
	if(localStorage.getItem("name")==""||localStorage.getItem("name")==null){
		$scope.user_name="未登录";
	}else if(localStorage.getItem("name")!=""){
		$scope.user_name=localStorage.getItem("name");
	}
	$scope.show=false;
	$scope.fn=function($event){
		 $event.stopPropagation()
		if($scope.user_name=="未登录"){
			$state.go("wzy.login")
		}else{
			$scope.show=true;
			$scope.fg=function(){
				$scope.user_name="未登录";
				$scope.show=false;
				$state.go("wzy.login")
				 delete localStorage['name']
			}
			
		}
	};
	$scope.fl=function(){
		$scope.show=false;
	}
})
