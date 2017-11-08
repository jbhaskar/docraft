module.exports = function ($routeProvider,$mdThemingProvider,$locationProvider) {
        $routeProvider.
            when('/login', {templateUrl: 'login.html', controller: 'LoginCtrl'}).
            when('/assessment/:id', {templateUrl: 'assessment.html', controller: 'AssessmentCtrl'}).
            when('/list', {templateUrl: 'list.html', controller: 'ListCtrl'}).
            when('/admin', {templateUrl: 'admin.html', controller: 'AdminCtrl'}).
            when('/signup', {templateUrl: 'signup.html', controller: 'SignupCtrl'}).
            when('/home', {templateUrl: 'home.html', controller: 'HomeCtrl'}).
            otherwise({redirectTo: '/login'});

        $mdThemingProvider.theme('docs-dark', 'default')
          .primaryPalette('indigo', { 'default': '500'})
          .accentPalette('indigo', { 'default': '900'});;

        $mdThemingProvider.alwaysWatchTheme(true);
        $locationProvider.hashPrefix('');

    };