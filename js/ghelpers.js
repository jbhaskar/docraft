module.exports = function($rootScope, $location, $cookies) {
        $rootScope.showAccountMenu = function($mdMenu, ev) {
            $mdMenu.open(ev);
        };

        $rootScope.loginPath = function() {
            return $location.url() === "/login";
        };

        $rootScope.userLogout = function() {
            $cookies.remove('CurrUser');
            return $location.path("/login");
        };

        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
          if ($cookies.get('CurrUser') == null) {
            // no logged user, redirect to /login
            if ( next.templateUrl === "partials/login.html") {
            } else {
              $location.path("/login");
            }
          }
        });

    };