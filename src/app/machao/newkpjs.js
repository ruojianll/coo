angular.module('coo').controller('MainController',function($scope,$http,apiServ,environment){
	apiServ.post('/api/board/all',{}).then(
		function(data){
			$scope.board_all=data;
		},function(err){
		}
	)
//	apiServ.post('/api/user/orgnization/all',{}).then(
//		function(data){
//			$scope.fourname=data[0].orgnization_name;
//			console.log(data)
//		},function(err){
//		}
//	);
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
	$scope.orgnizational=function(){
		apiServ.post('/api/board/add',{
			type:'orgnizational',
		    board_name:$scope.board_name,
		    orgnization_id:$scope.fourname
		}).then(function(data){
			console.log(data)
		},function(err){
			console.log(err)
		}
		)
//		apiServ.post('/api/user/orgnization/all',{}).then(
//			function(data){
//				console.log(data)
//			},function(err){	
//				console.log(err)
//		})
	}
})
