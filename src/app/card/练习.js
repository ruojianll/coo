//	var t = new Date();
//	var strt = moment(t).format();
//	var objt = moment(strt).toDate();
//	
//	console.log(moment().format('MMMM --- mm'));
//	alert(angular.fromJson('{"type":"text"}')) //AngularJs的angular.fromJson()方法可以把一个Json字符串中解析成一个对象,或对象数组
//	$scope.html = $sce.trustAsHtml('<input type="checkbox" ><span>新选择框</span>');//把字符串标签给转换成标签，，在页面新建一个div，里面写上ng-bind-html="html",如<div ng-bind-html="html"></div>

//						var json = eval('(' + data.cards[i].items[j].data + ')');//字符串转换成json
//						JSON.parse(data.cards[i].items[j].data)//字符串转换成json
//						data.cards[i].items[j].dataJson.push(angular.fromJson(data.cards[i].items[j].data)//字符串转换成json)

//		var item_data={type:"text",data:""};
//		item_data = angular.toJson(item_data);//自动转换成对象


//	        	var html = '<hello></hello>';
//	        	var content = $compile(html)($scope);//在angular中给动态创建的元素编译，让创建的ng都可以使用
//				$(content).insertBefore(".new-card");
//				$scope.card_title=$('.card_name').val();//创建新卡片时，让创建的卡片名字显示在新卡片上