 angular.module('coo').controller('TimepickerDemoCtrl', function ($scope) { 
 $scope.mytime = new Date();
$scope.fn=function(){
 $('.card-content').append('<div class="card-inp1" id="inp1"><input type="text" value="新文本" class="txt"></div>')
}
 });
 