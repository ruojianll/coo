angular.module('coo')
.controller('card', function ($scope,$http,apiServ,environment,$state,$log) {
	$scope.alerts = [];

	$scope.addAlert = function() {
		$scope.alerts.push({msg: ''});
	};
	
	$scope.closeAlert = function(index) {
	    $scope.alerts.splice(index, 1);
	};
	
	$scope.select = function(index) {
	    $scope.sel=true;
	};

	
//	time
 	$scope.show_a=false;
 	$scope.show_b=false;
	$scope.time_a=function(){
		$scope.show_a=true;
	}
//	$scope.date=$filter('date')($scope.date_x,'yyyy-MM-dd');
//	$scope.date_a=$filter('date')($scope.date_x,'yyyy-MM-dd');
//	$scope.date_b=$filter('date')($scope.date_x,'yyyy-MM-dd');
	$scope.date_x=new Date();
//	$scope.date_a+'&nbsp;&nbsp;&nbsp;'+$scope.date_b;
 	$scope.mytime = new Date();
	$scope.time=function(){
	  $scope.show_b=true;
		
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
	  	
		$scope.complete=function(){			
		  	$scope.date_x=$scope.dt;
		  	$scope.show_b=false;
		  	
		}
		
	}
	apiServ.post('/api/board/get',{
		board_id:56
	}).then(
		function(data){
			console.log(data.data)
		},
	    function(err){
	          console.log(err) 
	        }
	)
	$scope.focus=function(){
		apiServ.post('/api/item/edit',{
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
		$('#card-show').width(
		324*($('.card-zt').length+3)
	)
		if($('#card-show').width()>$(document).width()){
			$('#card-show').css('left',$(document).width()-$('#card-show').width()+220)
		}
		var html='<div class="card-zt"><div class="card-top"><input type="text" value="新卡片" class="card-title"><span class="glyphicon glyphicon-trash"></span><div  class="card-btn-group" uib-dropdown is-open="status.isopen"><span class="glyphicon glyphicon-plus" id="single-button" type="button" class="btn btn-primary" uib-dropdown-toggle ng-disabled="disabled"></span> <ul class="dropdown-menu" uib-dropdown-menu role="menu" aria-labelledby="single-button"> <li role="menuitem"><a href="javascript:;" ng-click="addAlert()">文本</a></li> <li role="menuitem" ng-click="time_a()"><a href="javascript:;">时间</a></li><li role="menuitem" ng-click="select()"><a href="javascript:;"><option>选择框<select></select></option></a></li><li role="menuitem" ng-click="addAlert()"><a href="javascript:;">@</a></li><li role="menuitem" ><a href="javascript:;" ng-click="fn()">图片</a></li></ul></div></div></div>'
		$(html).insertBefore(".new-card");
	apiServ.post('/api/card/add',{
		board_id:56,
		card_name:$scope.cardname
	}).then(
		function(data){
			console.log(data)
		},
	    function(err){
	          console.log(err) 
	        }
	)
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
//	var move=false
//	$scope.down=function(e){
//
//		move=true;
//		var l=e.pageX-$('#card-box').css('left');
//		$(document).mousemove(function(e){
//			if(move){
//			$('#card-box').css('left',e.pageX-l)
//			if($('#card-box').css('left')<0)$('#card-box').css('left','0')
//			if($('#card-box').css('left')>$('#card-scroll').width()-$('card-box').width())$('#card-box').css('left',$('#card-scroll').width()-$('card-box').width())
//			ll=$('#card-box').css('left')/($('#card-scroll').width()-$('card-box').width())
//			$('#card-show').css('left',-($('#card-show').width()-$('#card-canvas').width())*11)
//			}
//		})
//		$(document).mouseup(function(){
//			move=false
//		})
//		
//		
//	}
//	
//	card-box.onmousedown=function(e){
//		var ev=e||event;
//		var l=ev.clientX-this.offsetLeft;
//		document.onmousemove=function(e){
//			var ev=e||event;
//			card-box.style.left=ev.clientX-l+'px'
//			if(card-box.offsetLeft<0)card-box.style.left=0
//			if(card-box.offsetLeft>(card-scroll.offsetwidth-card-box.offsetwidth))card-box.style.left=(card-scroll.offsetwidth-card-box.offsetwidth)+'px'
//			ll=card-box.offsetLeft/(card-scroll.offsetwidth-card-box.offsetwidth)
//			
//			card-show.style.left=-(card-show.offsetwidth-card-canvas.offsetwidth)*ll+'px'
//		}
//		document.onmouseup=function(){
//			document.onmousemove=null;
//			document.onmouseup=null;
//		}
//	}

	
	
	
	
	
	
	
	
	
	
	

	
//	$scope.fn=function(){
//		var str='<div class="card-inp1"  id="inp1"><input type="text" placeholder="新文本" class="txt"></div>';
//		$('.card-pic').append(str);
//	};	
})



