module.exports = function ($scope, $location, $rootScope, $http, UserService) {
    // $scope.login = function() {
    //   var user =  UserService.getUser($scope.email);
    //   if ($scope.password == 't3l3m3d' ) {
    //     UserService.setCurrentUser(user);
    //     $rootScope.loggedInUser = user;
    //     console.log($rootScope.loggedInUser);
    //   }


    //   if (user.type == 'Admin') location.href = "#/admin";
    //   if (user.type == 'Doc') location.href = "#/list";
    //   if (user.type == 'Patient') location.href = "#/assessment/" + user.id;

    // };


    $scope.userCredentials = {};
    $scope.invalid = "";
    /**
     * Login using user credential.
     */
    $scope.login = function (credentials) {
      console.log("===========================");
      console.log(credentials);
      if(credentials.username === undefined ||credentials.username === null || credentials.password=== undefined ||credentials.password=== null){
        $scope.invalid = "Please fill the credentials";
      }
      else{
        var headers = credentials ? {
          authorization: "Basic " + btoa(credentials.username + ":" + credentials.password)
        } : {};
        
        $http({ method: 'GET',
          url: 'http://0.0.0.0:2020/login',
          headers: headers
        }).then( function (response) {
      console.log("=======response====================");
          console.log(response);
          // debugger;
          $rootScope.userView = response.data.administrator === true; // if user is admin then to show userManagement tab 
          $rootScope.authenticated = true;
          $rootScope.sessionId = response.data.sessionId;

          //RealTimeChannel.init();
          location.href = "#/list";
          // $location.path("#/list");
        }, function (error) {
      console.log("===============error============");
          console.log(JSON.stringify(error));
          $scope.invalid = "Invalid username or Password";
          $scope.userCredentials = {};
        });
      }
       
      
    };
};