angular.module('coo').controller('comder',function($scope,$http,apiServ,environment,$state,$stateParams){
	//获取所有公告板
	apiServ.post('/api/board/all',{}).then(
		function(data){
			$scope.board_all=data;//personal_boards:[],orgnization_boards:[]
    
		},function(err){
		}
	)
	
	//获取组织下所有用户
	apiServ.post("/api/orgnization/user/all",{
		 orgnization_id:"four"
	}).then(
		function(data){
			console.log(data)
		},function(err){
			console.log(err)
		}
	)
	
	
	$scope.board_name="公告板",
	$scope.personal=function(){
		apiServ.post('/api/board/add',{
			type:'personal',
		    board_name:$scope.board_name
		});
		apiServ.post('/api/board/all',{}).then(
			function(data){
				$scope.board_all=data
			},function(err){	

		})
	}
});
angular.module('coo').controller('comdertyu',function($scope,$http,apiServ,environment,$state,$stateParams){
	//获取所有的组织
	apiServ.post('/api/user/orgnization/all',{}).then(
		function(data){ 
			$scope.fourname=data
		},function(err){}
	);
	$scope.orgnization_user=function(id,name){
	    $state.go("wzy.machao.netwo",{
	    	id:id,name:name
	    });
	    $scope.$parent.orgnizationname=name;
	}
});
angular.module('coo').controller('comdersht',function($scope,$http,apiServ,environment,$state,$stateParams){
		//点击添加用户
	$scope.orgnizational=function(){
		apiServ.post('/api/board/add',{
			type:'orgnizational',
		    board_name:$stateParams.name,
		    orgnization_id:$stateParams.id,
		});
		apiServ.post('/api/board/all',{}).then(
			function(data){
				$scope.orgnizational_all=data;
			},function(err){
			}
		);
	}
	//获取组织公告板
     apiServ.post('/api/board/all',{}).then(
		function(data){
			$scope.orgnizational_all=data;
		},function(err){
		}
	);
})
	

	

