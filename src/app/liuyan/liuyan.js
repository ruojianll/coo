angular.module("coo").controller("yan",function($scope,$http,apiServ,environment){
	
	$scope.dianji=function(){
			    function CurentTime()
    { 
        var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
       
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
		var ss = now.getSeconds();			//秒
       
        var clock = year + "-";
       
        if(month < 10)
            clock += "0";
       
        clock += month + "-";
       
        if(day < 10)
            clock += "0";
           
        clock += day + " ";
       
        if(hh < 10)
            clock += "0";
           
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm + ":"; 
		
        if (ss < 10) clock += '0'; 
        clock += ss; 
        return(clock); 
}
				var sp3=document.createElement('span')
				sp3.id='sp1'
				sp3.innerHTML=te.value
				var sp4=document.createElement('span')
				sp4.id='sp2'
				var op1=document.createElement('p')
				op1.id='op'
				var sp5=document.createElement('a')
				sp5.id='right'
				sp5.innerHTML=CurentTime()
				var sp6=document.createElement('a')
				sp6.className='name'
				sp6.innerHTML=$scope.user_name
				if(te.value==''){
				}else{
				sp4.appendChild(sp5)
				sp4.appendChild(sp6)
				op1.appendChild(sp3)
				op1.appendChild(sp4)
				div1.appendChild(op1)
				te.value=''}
	}
})