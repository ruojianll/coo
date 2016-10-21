
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
			$('.ma-lanp').before(ma)

angular.module('coo').controller('comder',function($scope,$http,apiServ,environment,$state,$stateParams){
	//获取个人公告板
	apiServ.post('/api/board/all',{}).then(
		function(data){
			$scope.board_all=data;
		},function(err){
		}
	);
	//添加个人的公告板
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
		//点击组织用户跳转
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
	

	

