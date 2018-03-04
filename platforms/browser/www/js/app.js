var app=angular.module("imigrate",["ngRoute","ngAnimate"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "src/login/login.html",
        controller: "login"
    })
    .when("/registro",{
    	templateUrl : "src/registro/registro.html",
    	controller : "registro"
    })
    /*.when("/red", {
        templateUrl : "red.htm"
    })
    .when("/green", {
        templateUrl : "green.htm"
    })
    .when("/blue", {
        templateUrl : "blue.htm"
    });*/
});

app.controller("login",function($scope,$http,$location){

	$scope.login=function(){

		if (!localStorage.username)
    		localStorage.username = $scope.username;
    	if(!localStorage.passw)
    		localStorage.passw= $scope.passw;
    	data ='username='+$scope.username+'&password='+$scope.passw+'&action=look';
    	 
    	 var config = {
                headers : {
                    'Content-Type': 'application/json;charset=utf-8;'
                },
                 withCredentials: true
            }
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        
        // Delete the Requested With Header
        delete $http.defaults.headers.common['X-Requested-With'];
           // $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
          //  delete $http.defaults.headers.common['X-Requested-With'];
    	//$http.post('https://www.umbrellatec.com/imigrate/users.php',
    	 //data,
    	 //config
    	 //)
           // .success(function (data, status, headers, config) {
          //      $scope.PostDataResponse = data;
          //      console.log(data.mensaje)
          //  })
		$http.post('https://www.umbrellatec.com/imigrate/users.php',data).then(function(response) {
    	//authToken = response.headers('A-Token');
    	//$scope.user = response.data;
    	//response= JSON.stringify(response)
    	console.log(response)
    	$scope.mensaje=response.data.mensaje;
    	console.log(response.data.mensaje)
  		}).catch(function() {
    		$scope.mensaje = 'Error grave';
  		});

    	//$location.path("/registro");
	}

	$scope.registro=function () {
		
		if (localStorage.username)
    		localStorage.username = $scope.username;
    	if(localStorage.passw)
    		localStorage.passw= $scope.passw;
    	$location.path("/registro");
	}

})

app.controller("registro",function($scope,$http,$location){
//	if (localStorage.username)
  //  	 $scope.username=localStorage.username;
   // if(localStorage.passw)
    //	 $scope.passw=localStorage.passw;
    
    $scope.registro=function(){
        if($scope.username.length>2 && $scope.passw.length>2 && $scope.email.length>5)
        {
    	   $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    	   delete $http.defaults.headers.common['X-Requested-With'];
    	   data ='username='+$scope.username+'&password='+$scope.passw+'&action=registro&email='+$scope.email;
    	   $http.post('https://www.umbrellatec.com/imigrate/users.php',data).then(function(response) {
    	//authToken = response.headers('A-Token');
    	//$scope.user = response.data;
    	//response= JSON.stringify(response)
    	    console.log(response)
            $scope.mensaje=response.data.mensaje;
    	       console.log(response.data.mensaje)
  		        }).catch(function() {
    		  $scope.mensaje = 'error grave...';
  		    });
        }
        else
        {
            $scope.mensaje='El usuario debe tener una longitud de mas de 5 caracteres '
        }

    }




})