module.exports = function($rootScope, $location, $cookies, $http) {
        $rootScope.showAccountMenu = function($mdMenu, ev) {
            $mdMenu.open(ev);
        };

        $rootScope.loginPath = function() {
            return $location.url() === "/login";
        };

        $rootScope.userLogout = function() {
            $rootScope.authenticated = false;
            $rootScope.sessionId = null;
            return $location.path("/login");
        };

        $http.defaults.headers.post['X-XSRF-TOKEN'] = $cookies['csrftoken'];

        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
          if (!$rootScope.authenticated || $rootScope.sessionId == null) {
            // no logged user, redirect to /login
            if ( next.templateUrl === "partials/login.html") {
            } else {
              $location.path("/login");
            }
          }
        });

    };