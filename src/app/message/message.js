$('body').delegate('.send','click',function(){	
		var new_div = "<div class='back_blue'>"
		+"<div class='hellow'>"
			+"<p>hellow</p>"
		+"</div>"
		+"<p class='user_name'>lilei</p>"
		+"<p class='data'>2016-10-09</p>"
		+"<p class='time'>13:58:09</p>"
	+"</div>"
	$('.hellow p').html($('.message input').val()) 
	$('.message_right').prepend(new_div)
})