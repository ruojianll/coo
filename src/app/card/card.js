angular.module('coo')
.controller('card', function ($scope,$http,apiServ,environment,$state,$log,$compile) {
	
	//删除bord
	$scope.delBord = function(){

		r=confirm('您是要删除这个公告板吗？')
							if(r==true){
								apiServ.post('/api/board/delete',{
									    board_id:board_id
									}).then(
								        function(data){
								        	$state.go('wzy.machao.neto')
								        },
								        function(err){
								        	console.log(err) 
								        }
								    )
							}else{
								
							}
	}
	$scope.card_show=true;
	//删除新卡片     只可以删除最开始的那个         
//	$scope.del_card=function(){
//		$scope.card_show=false;
//	}
	
	//添加新文本,添加条目
	$scope.alerts = [];
	$scope.addAlert = function(card_id) {
		var item_data="{'type':'text','新文本'}"
		apiServ.post('/api/item/add',{
			card_id:card_id,
		    board_id:board_id,
		    item_data:item_data
		}).then(
	        function(data){
	        	$scope.alerts.push({msg: ''});
	        	get_board()
	        	console.log(data)
	        },
	        function(err){
	        	console.log(err) 
	        }
	    )
		
	};
	//	失去焦点,编辑文本,text
	$scope.blur=function(card_id,d){
		
		apiServ.post('/api/item/edit',{
			board_id:board_id,
    		card_id:card_id,
    		item_id:$(items).eq(d).id,
    		item_data:$('.txt').eq(d).val()
		}).then(
	        function(data){
	        	alert(333)
	        	console.log(data)
	        },
	        function(err){
	          	console.log(err) 
	        }
	    )
	}
//	删除新文本
	$scope.closeAlert = function(index,card_id) {
		apiServ.post('/api/item/delete',{
			card_id:card_id,
		    board_id:board_id,
		    item_id:item_id
		}).then(
	        function(data){
	        	alert(333);
	        	$scope.alerts.splice(index, 1);
	        	console.log(data)
	        },
	        function(err){
	          	console.log(err) 
	        }
	    )
	    

	};
//	显示选择框
	$scope.select = function(index) {
	    $scope.sel=true;
	};
	
 	$scope.show_a=false;//隐藏时间框
 	$scope.show_b=false;//隐藏时间插件
 	
// 	显示时间框
	$scope.time_a=function(){

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
	
	//获取当前board板的board_id
	url=window.location.href;
	board_id=url.split('=')[1];
	
	//获取公告板
	function get_board(){
		apiServ.post('/api/board/get',{
			board_id:board_id
		}).then(
		    function(data){
				$scope.board_name=data.name;
				$scope.card_creat=data.cards;
				for(var i=0;i<data.cards.length;i++){
					$scope.card_creat[i].items=[]
					for(var j=0;j<data.items.length;j++){
						if(data.items[j].card_id==data.cards[i].id){
							$scope.card_creat[i].items.push(data.items[j])
						}	
					}
					
				}
		        console.log(data)
		    },
		    function(err){
		        console.log(err) 
		    }
		)
	}
	get_board()
	//添加卡片
	$scope.save=function(){
		card_name=$('.card_name').val();//创建新卡片时，让创建的卡片名字显示在新卡片上
		apiServ.post('/api/card/add',{
			board_id:board_id,
    		card_name:card_name
		}).then(
	        function(data){
				get_board()
				$('.card_name').val('')
	        	console.log(data)
	        },
	        function(err){
	          console.log(err) 
	        }
	   	)
	}
	
	//删除卡片    可以删除后来创建的新卡片和页面的卡片
	$scope.del_card=function(card_id,d){
		console.log(card_id+d)
//		var delCard=$('#del_card').parents('.card-zt').eq(d);
		apiServ.post('/api/card/delete',{
			board_id:board_id,
    		card_id:card_id
		}).then(
	        function(data){
//	        	$(delCard).css('display','none');
//				$('#del_card').parents('.card-zt').css('display','none');
				get_board()
	        	console.log(data)
	        },
	        function(err){
	          console.log(err) 
	        }
	   	)
		
	}
	//编辑卡片标题
	$scope.card_titBlur=function(card_id,d){
		var cardName=$('.cardName').eq(d).val();
		apiServ.post('/api/card/edit/title',{
			board_id:board_id,
		    card_id:card_id,
		    card_name:cardName
		}).then(
	        function(data){
	        	console.log(data)
	        },
	        function(err){
	        	console.log(err) 
	        }
	    )
	}
	
	
}).directive("weiyi",function(){  
                return{  
                    restrict :'A',
                    link :function(scope,element,attr){  
                        attr.data=angular.equals(attr.data,"true");  
                        console.log(element);  
                        element.on("mousedown",function(e){  
                            var that = $(this);    
                            var x=e.clientX-$(this).offset().left;  
                            var y=e.clientY-$(this).offset().top;  
                            $(document).on("mousemove",function(e){  
                             		
                                    						that.css({"position":"absolute","left":e.clientX-x-20,"top":e.clientY-y-123});  
                            });  
                            $(document).on("mouseup",function(e){
                            	
                                $(document).off(); 
                                
                            })  
  
                        })  
                    }  
                }  
            }).controller('show',['$scope',function(scope$){  
  
                  
            }]);  

//	        	var html = '<hello></hello>';
//	        	var content = $compile(html)($scope);//在angular中给动态创建的元素编译，让创建的ng都可以使用
//				$(content).insertBefore(".new-card");
//				$scope.card_title=$('.card_name').val();//创建新卡片时，让创建的卡片名字显示在新卡片上
//.directive("hello",function(){
//	return {
//		restrict:'AEMC',
//		templateUrl:'app/card/wenben_card.html'
////		scope:true,
//		
//	}
//})
//		var itemText=item_data
//		if(itemText.substring(0)=="\"")
//		{
//		//字符串以"开头，去掉"
//		itemText=itemText.substr(1,itemText.length-1)
//		}
//		if(itemText.substring(itemText.length-1)=="\"")
//		{
//		//字符串以"结尾，去掉"
//		itemText=itemText.substr(0,itemText.length-2)
//		}



