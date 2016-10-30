angular.module("coo").controller("yan",function($scope,$http,apiServ,environment,$location,$timeout){
		var board_id=$location.url().substring($location.url().indexOf("=")+1);
		//点击添加评论
		$scope.comment_add=function(){
			apiServ.post("/api/comment/add",{
        	board_id:board_id,
            comment_content:$scope.comment_content
        }).then(function(data){
        	$scope.comment_content=""
        })
       
        
    //点击之后再次获取评论
	    apiServ.post("/api/comment/all",{
			board_id:board_id
		}).then(function(data){
	        	$scope.comment_all=data;
	    })
		//滚动条到最底部
        $scope.scrollWindow=function(){ var _el=document.getElementById('yan_div1'); _el.scrollTop=_el.scrollHeight;};

			$timeout(function(){ $scope.scrollWindow(); },500);

		}
		//获取评论
		apiServ.post("/api/comment/all",{
			board_id:board_id
		}).then(function(data){
        	$scope.comment_all=data;
        })
		
		//删除评论
		$scope.comment_delete=function(id){
			apiServ.post("/api/comment/delete",{
				board_id:board_id,
                comment_id:id
			})
		//删除之后获取评论
		apiServ.post("/api/comment/all",{
			board_id:board_id
		}).then(function(data){
        	$scope.comment_all=data;
        })	
		}
		

})
