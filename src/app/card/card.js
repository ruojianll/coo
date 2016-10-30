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
 	$scope.dd=new Date();
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
 	
 	$scope.parseTime = function(date){
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    };
// 	添加，显示时间框
	$scope.time_a=function(card_id,index){
		var item_dataA={'type':'time','data':moment($scope.dd).format()}
		item_dataA = angular.toJson(item_dataA);//自动转换成对象
		apiServ.post('/api/item/add',{
			card_id:card_id,
		    board_id:board_id,
		    item_data:item_dataA
		}).then(
	        function(data){
	        	get_board()
	        },
	        function(err){
	        	console.log('ajax错误~~'+err) 
	        }
	    )
	}
	//编辑时间 显示
	$scope.edit_time=function(event){
		$(event.target).next().css('display','block')
	}
	//编辑时间,完成
		$scope.complete=function(card_id,item_id,item,event){
			var item_dataC={'type':'time','data':item.dataJson[0].data}
			item_dataC = angular.toJson(item_dataC);//自动转换成对象
			apiServ.post('/api/item/edit',{
				board_id:board_id,
	    		card_id:card_id,
	    		item_id:item_id,
	    		item_data:item_dataC
			}).then(
		        function(data){
		        	$(event.target).parent().css('display','none')
			    },
			    function(err){
			    	console.log('ajax错误~~'+err) 
			    }    
			)    
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
	$scope.readItemImage = function(file,item,card_id,item_id,event){
		console.log('上传图片')
        if(!file){
            return;
        }
        var reader = new FileReader();
        reader.onload = function(e){
            item.dataJson[0].data.dataUrl = reader.result;
        }
        reader.readAsDataURL(file);
		
		setTimeout(function(){
			apiServ.post('/api/item/edit',{
			board_id:board_id,
    		card_id:card_id,
    		item_id:item_id,    			item_data:angular.toJson({'type':'image','data':{url:item.dataJson[0].data.url,title:item.dataJson[0].data.title,dataUrl:item.dataJson[0].data.dataUrl}})
		}).then(
	        function(data){
			
	        },
	        function(err){
	          	console.log('ajax错误~~'+err) 
	        }
	    )
			$('.img_edit').css('display','none')
		},500)
    }
	//编辑图片
	$scope.img_replace=function(event){
		console.log('开始编辑')
		$(event.target).parents('.image').find('.img_edit').css('display','block')
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
	
	//留言板
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





