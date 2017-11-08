module.exports = function ($scope, $location, $rootScope, UserService) {
    $scope.login = function() {
      var user =  UserService.getUser($scope.email);
      if ($scope.password == 't3l3m3d' ) {
        UserService.setCurrentUser(user);
        $rootScope.loggedInUser = user;
        console.log($rootScope.loggedInUser);
      }


      if (user.type == 'Admin') location.href = "#/admin";
      if (user.type == 'Doc') location.href = "#/list";
      if (user.type == 'Patient') location.href = "#/assessment/" + user.id;

    };
};