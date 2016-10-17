 angular.module('coo')
.controller('card', function ($scope) {
	
	
	$scope.fn=function(){
		var str='<div class="card-inp1"  id="inp1"><input type="text" placeholder="新文本" class="txt"></div>';
		$('.card-pic').append(str)
	};
})
.directive('wenben', function () {
    return {
        
        restrict:'AEMC',
			templateUrl:'app/card/wenben.card.html',
			link:function(scope,element,attrs){
			
			}
    };
}); 