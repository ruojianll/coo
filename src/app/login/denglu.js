angular.module('coo').service('apiServ',function($http,environment,$q){
    var handle = function(url,data,type){
        url = environment.http + url;
        var deferred = $q.defer();
        var config = {};
        config.headers = {};
        if(localStorage['user_id']){
            config.headers['AliceSPA-UserId'] = localStorage['user_id'];
        }
        if(localStorage['web_token']){
            config.headers['AliceSPA-WebToken'] = localStorage['web_token'];
        }
        if(type === 'GET'){
            $http.get(url,config).then(
                function(data){
                    if (data.data.status == 'SUCCESS') {
                        deferred.resolve(data.data.data);
                    }
                    else{
                        deferred.reject(data);
                    }
                },
                function(err){
                    deferred.reject(data);
                }
                );
        }
        if(type === 'POST'){
            $http.post(url,data,config).then(
                function(data){
                    if (data.data.status == 'SUCCESS') {
                        deferred.resolve(data.data.data);
                    }
                    else{
                        deferred.reject(data);
                    }
                },
                function(err){
                    deferred.reject(data);
                }

                );
        }
        return deferred.promise;
    }
    return {
        get:function(url){return handle(url,null,'GET');},
        post:function(url,data){return handle(url,data,'POST');}
    }
}).constant('environment',{
	http:'http://10.115.19.223:8091'
}).controller('accountServ',function($scope,$http,apiServ,environment,$state){
	$scope.denglu=function(){
		apiServ.post('/api/account/login',{
			user_name:$scope.name,
			password:$scope.psd
		}).then(
	        function(data){
	        	 	$scope.$parent.user_name=data.user_name;
	            var user_id = data.id;
	            var token = data.web_token;
	            localStorage['user_id'] = user_id;
	            localStorage['web_token'] = token;
	            localStorage['name'] = data.user_name;
	            $state.go('wzy.machao')
	        },
	        function(err){
	          console.log(err) 
	        }
	    )
	}
})
