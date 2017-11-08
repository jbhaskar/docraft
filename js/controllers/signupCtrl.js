module.exports = function ($scope, $location, UserService) {
        this.myDate = new Date();
        this.isOpen = false;

        $scope.signup = function() {
          $scope.user.type = 'Patient';
          $scope.user.id = 5616;
          if (UserService.addUser(angular.copy($scope.user))) {
            $location.path("/list");
          }
        }
    };