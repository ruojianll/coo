angular.module('coo')
.controller('card', function ($scope,$http,apiServ,environment,$state,$log,$compile,$sce,$stateParams) {//
//获取当前board板的board_id
//	url=window.location.href;
//	url.split('=')[1];
	board_id=$stateParams.board_id;//这个$stateParams就是url里面传的参数的集合
	//获取公告板
	function get_board(){
		apiServ.post('/api/board/get',{
			board_id:board_id
		}).then(
		    function(data){
				$scope.board_name=data.name;
				$scope.card_creat=data.cards;
				//把data.items给放到data.cards.items
				for(var i=0;i<data.cards.length;i++){
					$scope.card_creat[i].items=[];
					for(var j=0;j<data.items.length;j++){
						if(data.items[j].card_id==data.cards[i].id){
							$scope.card_creat[i].items.push(data.items[j])
						}	
					}
				}
				//把字符串json转换成对象
				for(var i=0;i<data.cards.length;i++){
					for(var j=0;j<data.cards[i].items.length;j++){
						data.cards[i].items[j].dataJson=[];
						data.cards[i].items[j].dataJson.push(angular.fromJson(data.cards[i].items[j].data));
					}
				}
				
//				for(var t=0;t<data.cards.length;t++){
//					data.cards[t].item_new=[];
//					var atItem=t;
//					for(var r=0;r<data.cards[t].items.length;r++){
//						//把type是text的条目都循环一遍
//						if(data.cards[t].items[r].dataJson[0].type=='text'){
//							data.cards[t].item_new.push(data.cards[t].items[r])
//						}
//						//让type是time的条目显示
//						if(data.cards[t].items[r].dataJson[0].type=='time'){
//							$scope.show_a=true;
//							$scope.time_id=data.cards[t].items[r].id;
//						}
//						//让type是checkbox的条目显示
//						if(data.cards[t].items[r].dataJson[0].type=='checkbox'){
//							$scope.sel=true;
//							$scope.check_box=data.cards[t].items[r].id;
//							if(data.cards[t].items[r].dataJson[0].data.checked==true){
//								$scope.sel_che=true
//							}
//							if(data.cards[t].items[r].dataJson[0].data.checked==false){
//								$scope.sel_che=false
//							}
//						}
//						//让type是at的条目显示
//						if(data.cards[t].items[r].dataJson[0].type=='at'){
//							console.log('已有@```````')
//							$scope.at=true;
//							$scope.at_yonghu=data.cards[t].items[r].id;
//							$scope.yonghu=data.cards[t].items[r].dataJson[0].data
//						}
//					}
//				}
				
		        console.log(data)
		    },
		    function(err){
		        console.log(err) 
		    }
		)
	}
	get_board()
	$scope.card_show=true;
	$scope.sel_che=false;
	$scope.sel=false;
	$scope.at=false;
	$scope.show_a=false;//隐藏时间框
 	$scope.show_b=false;//隐藏时间插件
 	$scope.dt=new Date();
	//添加新文本,添加条目
	$scope.addAlert = function(card_id) {
		var item_data={type:"text",data:""};
		item_data = angular.toJson(item_data);//自动转换成对象
		apiServ.post('/api/item/add',{
			card_id:card_id,
		    board_id:board_id,
		    item_data:item_data
		}).then(
	        function(data){
	        	get_board()
	        },
	        function(err){
	        	console.log('ajax错误~~'+err) 
	        }
	    )
		
	};
	//	失去焦点,编辑条目,text
	$scope.blur=function(event,card_id,d){
//		console.log(event.target)
		apiServ.post('/api/item/edit',{
			board_id:board_id,
    		card_id:card_id,
    		item_id:d,
    		item_data:angular.toJson({'type':'text','data':event.target.value})
		}).then(
	        function(data){
	        },
	        function(err){
	          	console.log('ajax错误~~'+err) 
	        }
	    )
	}
//	删除新条目 ，删除文本
	$scope.closeAlert = function(card_id,item_id) {
		apiServ.post('/api/item/delete',{
			card_id:card_id,
		    board_id:board_id,
		    item_id:item_id
		}).then(
	        function(data){
	        	get_board()
	        },
	        function(err){
	          	console.log('ajax错误~~'+err) 
	        }
	    )
	};
//	添加，显示选择框
	$scope.select = function(card_id) {
		var item_dataB={'type':'checkbox','data':{"text":"新选择框","checked":false}};
		item_dataB = angular.toJson(item_dataB);//自动转换成对象
		apiServ.post('/api/item/add',{
			card_id:card_id,
		    board_id:board_id,
		    item_data:item_dataB
		}).then(
	        function(data){
	        	get_board()
	        },
	        function(err){
	        	console.log('ajax错误~~'+err) 
	        }
	    )
	};
	//编辑选择框
	$scope.check=function(card_id,event,item_id,item_data){
//		$scope.sel_che=!$scope.sel_che
		apiServ.post('/api/item/edit',{
			board_id:board_id,
    		card_id:card_id,
    		item_id:item_id,    			item_data:angular.toJson({'type':'checkbox','data':{'text':'新选择框','checked':item_data}})
		}).then(
	        function(data){
	        	console.log('已改变')
	        },
	        function(err){
	          	console.log('ajax错误~~'+err) 
	        }
	    )
	}
 	
 	
// 	添加，显示时间框
	$scope.time_a=function(card_id,index){
		var item_dataA={'type':'time','data':''}
		item_dataA = angular.toJson(item_dataA);//自动转换成对象
		apiServ.post('/api/item/add',{
			card_id:card_id,
		    board_id:board_id,
		    item_data:item_dataA
		}).then(
	        function(data){
	        	$scope.show_a=true;
	        	get_board()
	        },
	        function(err){
	        	console.log('ajax错误~~'+err) 
	        }
	    )
	}
	
// 	显示时间插件，还有时间插件本身
	$scope.time=function(index){
	  	$('.txt_time').eq(index).next().css('display','block')//显示时间插件
		//年月日，插件
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
	    	$scope.dt = d;
	  	};
	
	  	$scope.clear = function() {
	    	$scope.mytime = null;
	  	};
//	  	编辑时间,完成
		$scope.complete=function(card_id,index){
			var item_dataC={'type':'time','data':$('.txt_time').eq(index).html()}
			item_dataC = angular.toJson(item_dataC);//自动转换成对象
			apiServ.post('/api/item/edit',{
				board_id:board_id,
	    		card_id:card_id,
	    		item_id:$scope.time_id,
	    		item_data:item_dataC
			}).then(
		        function(data){
			    },
			    function(err){
			    	console.log('ajax错误~~'+err) 
			    }    
			)    
		  	$('.txt_time').eq(index).next().css('display','none')
		}
		
	}
	
	//添加显示  @框
	$scope.add_aite=function(card_id,index){
		var item_dataD={'type':'at','data':''}
		item_dataD = angular.toJson(item_dataD);//自动转换成对象
		apiServ.post('/api/item/add',{
			card_id:card_id,
    		board_id:board_id,
    		item_data:item_dataD
		}).then(
	        function(data){
	        	get_board()
//	        	$scope.at=true;
//	        	$('.aite').eq(index).css('display','block')
	        },
	        function(err){
	        	console.log('ajax错误~~'+err) 
	        }
	    )
	}
	//获取所有组织
	apiServ.post('/api/user/orgnization/all',{}).then(
	        function(data){
	        	console.log(data)
	        	$scope.orgnization_id=data[0].orgnization_id;
	        },
	        function(err){
	        	console.log('ajax错误~~'+err) 
	        }
	    )
	//点击@键后，获取组织下所有用户
	$scope.aite=function (event){
		apiServ.post('/api/orgnization/user/all',{
			orgnization_id:$scope.orgnization_id
		}).then(
	        function(data){
	        	console.log(data)
	        	$scope.atName=data;
	        	$(event.target).parent().find('ul').css('display','block')
	        },
	        function(err){
	        	console.log('ajax错误~~'+err) 
	        }
	    )
	}
	$scope.selName=function(index,event,card_id,item_id){
//		console.log('已点击用户名'+event.target.innerHTML);
//		console.log($(event.target).parents('.aite').find('b').html());
		function at_html(){
			$(event.target).parents('.aite').find('b').html($(event.target).parents('.aite').find('b').html()+','+event.target.innerHTML);
		}
		//编辑@
		apiServ.post('/api/item/edit',{
			board_id:board_id,
    		card_id:card_id,
    		item_id:item_id,    			item_data:angular.toJson({'type':'at','data':$(event.target).parents('.aite').find('b').html()+','+event.target.innerHTML})
		}).then(
	        function(data){
//	        	console.log('已改变')
				at_html()
//				$scope.attn=false;
$(event.target).parent().css('display','none')
	        },
	        function(err){
	          	console.log('ajax错误~~'+err) 
	        }
	    )
		
	}
	//添加显示  图片
	$scope.addImage=function(card_id){
		var item_dataD={'type':'image','data':{url:'assets/img/sav1.jpg',title:'新图片',dataUrl:'assets/img/sav1.jpg'}}
		item_dataD = angular.toJson(item_dataD);//自动转换成对象
		apiServ.post('/api/item/add',{
			card_id:card_id,
    		board_id:board_id,
    		item_data:item_dataD
		}).then(
	        function(data){
	        	get_board()
	        },
	        function(err){
	        	console.log('ajax错误~~'+err) 
	        }
	    )
	}
	$scope.readItemImage = function(file,item){
		console.log('上传图片')
        if(!file){
            return;
        }
        var reader = new FileReader();
        reader.onload = function(e){
            item.dataJson[0].data.dataUrl = reader.result;
        }
        reader.readAsDataURL(file);

    }
	//添加卡片
	$scope.save=function(){
		card_name=$('.card_name').val();//创建新卡片时，让创建的卡片名字显示在新卡片上
		apiServ.post('/api/card/add',{
			board_id:board_id,
    		card_name:card_name
		}).then(
	        function(data){
				get_board()
	        	console.log(data)
	        },
	        function(err){
	          console.log('ajax错误~~'+err) 
	        }
	   	)
	}
	
	//删除卡片    可以删除后来创建的新卡片和页面的卡片
	$scope.del_card=function(card_id){
		apiServ.post('/api/card/delete',{
			board_id:board_id,
    		card_id:card_id
		}).then(
	        function(data){
				get_board()
	        	console.log(data)
	        },
	        function(err){
	          console.log('ajax错误~~'+err) 
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
	        	console.log('ajax错误~~'+err) 
	        }
	    )
	}	
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
					console.log('ajax错误~~'+err) 
				}
			)
		}else{
								
		}
	}

	//编辑board标题
	$scope.boardName=function(){
		apiServ.post('/api/board/edit/title',{
			board_id:board_id,
    		board_name:$('#boardName').val()
		}).then(
	        function(data){
	        	console.log(data)
	        },
	        function(err){
	        	console.log('ajax错误~~'+err) 
	        }
	    )
	}
})

//	        	var html = '<hello></hello>';
//	        	var content = $compile(html)($scope);//在angular中给动态创建的元素编译，让创建的ng都可以使用
//				$(content).insertBefore(".new-card");
//				$scope.card_title=$('.card_name').val();//创建新卡片时，让创建的卡片名字显示在新卡片上



