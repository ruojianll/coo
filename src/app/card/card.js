angular.module('coo')
.controller('card', function ($scope,$http,apiServ,environment,$state,$log,$compile) {
	$scope.card_show=true;
	//删除新卡片     只可以删除最开始的那个         
//	$scope.del_card=function(){
//		$scope.card_show=false;
//	}
	//删除新卡片    可以删除后来创建的新卡片和页面的卡片
	$(".card-show").delegate('#del_card','click',function(){
		$(this).parent().parent().css('display','none')			
	})
	
	//添加新文本
	$scope.alerts = [];
	$scope.addAlert = function() {
		$scope.alerts.push({msg: ''});
	};
//	删除新文本
	$scope.closeAlert = function(index) {
	    $scope.alerts.splice(index, 1);
	};
//	显示选择框
	$scope.select = function(index) {
	    $scope.sel=true;
	};
	
 	$scope.show_a=false;//隐藏时间框
 	$scope.show_b=false;//隐藏时间插件
 	
// 	显示时间框
	$scope.time_a=function(){
		alert(11111)
		$scope.show_a=true;
	}

	$scope.date_x=new Date();
 	$scope.mytime = new Date();
 	
// 	显示时间插件，还有时间插件本身
	$scope.time=function(){
	  	$scope.show_b=true;//显示时间插件
		
		//年月日，插件
	  	$scope.dt = $scope.date_x;
	  	$scope.clear = function() {
	    	$scope.dt = null;
	  	};
	
	  	$scope.inlineOptions = {
	    	customClass: getDayClass,
	    	minDate: new Date(),
	    	showWeeks: true
	  	};
	
	  	$scope.dateOptions = {
	    	dateDisabled: disabled,
	    	formatYear: 'yy',
	    	maxDate: new Date(2020, 5, 22),
	    	minDate: new Date(),
	    	startingDay: 1
	  	};
	
	 	 // Disable weekend selection
	  	function disabled(data) {
	    	var date = data.date,
	      	mode = data.mode;
	    	return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
	  	}
	
	  	$scope.toggleMin = function() {
	    	$scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
	    	$scope.dateOptions.minDate = $scope.inlineOptions.minDate;
	  	};
	
	  	$scope.toggleMin();
	  
	  	$scope.open2 = function() {
	    	$scope.popup2.opened = true;
	  	};	

	  	$scope.popup2 = {
	    	opened: false
	  	};
	
	  	function getDayClass(data) {
	    	var date = data.date,
	      	mode = data.mode;
	    	if (mode === 'day') {
	      	var dayToCheck = new Date(date).setHours(0,0,0,0);
	
	      	for (var i = 0; i < $scope.events.length; i++) {
	        	var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
	
	        	if (dayToCheck === currentDay) {
	         	 return $scope.events[i].status;
	        	}
	      	}
	    }
	
	    return '';
	}
	  
	  	
//	小时,分钟,秒时间插件
  	$scope.hstep = 1;
  	$scope.mstep = 15;

 	 $scope.options = {
    	hstep: [1, 2, 3],
    	mstep: [1, 5, 10, 15, 25, 30]
  	};

  	$scope.ismeridian = true;
  	$scope.toggleMode = function() {
    	$scope.ismeridian = ! $scope.ismeridian;
  	};

 	 $scope.update = function() {
    	var d = new Date();
    	d.setHours( 14 );
    	d.setMinutes( 0 );
    	$scope.mytime = d;
  	};

  	$scope.changed = function () {
  		$scope.date_x=$scope.mytime;
    	$log.log('Time changed to: ' + $scope.date_x);
  	};

  	$scope.clear = function() {
    	$scope.mytime = null;
  	};
	  	
//	  	编辑时间,完成
		$scope.complete=function(){			
		  	$scope.date_x=$scope.dt;
		  	$scope.show_b=false;
		  	
		}
		
	}
	
//	失去焦点,提交文本,text
	$scope.blur=function(){
		apiServ.post('/api/account/login',{
			board_id:5,
			card_id:72,
			data:"{'type':'text','data':'新文本'}",
			id:59
		}).then(
	        function(data){
	        	 	console.log(data)
	        },
	        function(err){
	          console.log(err) 
	        }
	    )
	}
	
	$scope.save=function(){
//		alert(2)
		var html="<hello></hello>";
		var content = $compile(html)($scope);
		$(content).insertBefore(".new-card");
	}
	
})
.directive("hello",function(){
	return {
		restrict:'AEMC',
		templateUrl:'app/card/wenben_card.html'
//		scope:true,
		
	}
})


