var app = angular.module('docraft', ['ngRoute', 'ngAnimate', 'ngAria', 'ngMaterial', 'ngCookies' ])

app.run(function($rootScope, $location, $cookies) {
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

    });

app.directive('mdTable', function () {
  return {
    restrict: 'E',
    scope: { 
      headers: '=', 
      content: '=', 
      sortable: '=', 
      filters: '=',
      customClass: '=customClass',
      thumbs:'=', 
      count: '=',
      tmeplateid: '=',
      type: '='
    },
    controller: function ($scope,$filter,$window) {
      var orderBy = $filter('orderBy');
      $scope.tablePage = 0;
      $scope.nbOfPages = function () {
        return Math.ceil($scope.content.length / $scope.count);
      },
      $scope.handleSort = function (field) {
        if ($scope.sortable.indexOf(field) > -1) { return true; } else { return false; }
      };
      $scope.order = function(predicate, reverse) {
          $scope.content = orderBy($scope.content, predicate, reverse);
          $scope.predicate = predicate;
      };
      $scope.order($scope.sortable[0],false);
      $scope.getNumber = function (num) {
                    return new Array(num);
      };
      $scope.goToPage = function (page) {
        $scope.tablePage = page;
      };
    },
    templateUrl: "partials/patients.html"
  }
});

//UNCOMMENT BELOW TO BE ABLE TO RESIZE COLUMNS OF THE TABLE
app.directive('mdColresize', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$evalAsync(function () {
        $timeout(function(){ $(element).colResizable({
          liveDrag: true,
          fixed: true
          
        });},100);
      });
    }
  }
});

app.directive('chooseFile', function() {
    return {
      link: function (scope, elem, attrs) {
        var button = elem.find('button');
        var input = angular.element(elem[0].querySelector('input#fileInput'));
        button.bind('click', function() {
          input[0].click();
        });
        input.bind('change', function(e) {
          scope.$apply(function() {
            var files = e.target.files;
            if (files[0]) {
              scope.fileName = files[0].name;
            } else {
              scope.fileName = null;
            }
          });
        });
      }
    };
  });

app.directive('showFocus', function($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.showFocus, 
      function (newValue) { 
        $timeout(function() {
            newValue && element.focus();
        });
      },true);
  };    
});

app.filter('startFrom',function (){
  return function (input,start) {
    start = +start;
    return input.slice(start);
  }
});

    app.config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
        // $locationProvider.html5Mode(true);
    }])
    .config(function ($routeProvider,$mdThemingProvider) {
        $routeProvider.
            when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'}).
            when('/assessment/:id', {templateUrl: 'partials/assessment.html', controller: 'AssessmentCtrl'}).
            when('/list', {templateUrl: 'partials/list.html', controller: 'ListCtrl'}).
            when('/admin', {templateUrl: 'partials/admin.html', controller: 'AdminCtrl'}).
            when('/signup', {templateUrl: 'partials/signup.html', controller: 'SignupCtrl'}).
            when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'}).
            otherwise({redirectTo: '/login'});

        $mdThemingProvider.theme('docs-dark', 'default')
          .primaryPalette('indigo', { 'default': '500'})
          .accentPalette('indigo', { 'default': '900'});;

        $mdThemingProvider.alwaysWatchTheme(true);
    }).
    run(function($rootScope, $location, $cookies) {
      $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        if ($cookies.get('CurrUser') == null) {
          // no logged user, redirect to /login
          if ( next.templateUrl === "partials/login.html") {
          } else {
            $location.path("/login");
          }
        }
      });
    })
    .controller('LoginCtrl', function ($scope, $location, $rootScope, UserService) {
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
    })
    .controller('AssessmentCtrl', function ($scope, $routeParams, UserService, MedService) {
        $scope.patient = UserService.getUserById(parseInt($routeParams.id));

        $scope.goto = function(page) {
          console.log("Goto " + page);
        };

        $scope.addMed = function() {
          MedService.addMed(angular.copy($scope.med));
          $scope.content = MedService.meds;
        };

        $scope.toggleSearch = false;
        $scope.docheaders = [
            { name: 'Name', field: 'name'},
            { name:'Specialization', field: 'spec' },
            { name: 'Location', field: 'city'}
        ];
        $scope.headers = [
            { name: 'Medication Name(Brand)', field: 'medication' },
            { name:'Generic Name', field: 'generic_name' },
            { name: 'Form', field: 'form' },
            { name: 'Dose', field: 'dose' },
            { name: 'Route', field: 'route' },
            { name: 'Schedule', field: 'schedule'}
        ];

        $scope.content = MedService.meds;
        $scope.doccontent = UserService.getDoctors();

        $scope.custom = {medication: 'bold', form:'grey', generic_name: 'grey', dose: 'grey', schedule: 'grey'};
        $scope.sortable = ['medication','generic_name', 'form', 'dose', 'route', 'schedule'];
        $scope.thumbs = 'thumb';
        $scope.count = 3;

        $scope.doccustom = {name: 'bold', spec: 'grey', city: 'grey'};
        $scope.docsortable = ['name','spec', 'city'];
        $scope.docthumbs = 'thumb';
        $scope.doccount = 3;
    })
    .controller('ListCtrl', function ($scope, UserService) {
        $scope.patients = UserService.getPatients();
        $scope.currentUser = UserService.getCurrentUser();
        $scope.toggleSearch = false;
        $scope.headers = [
            { name: '', field:'thumb' },
            { name: 'Name', field: 'name' },
            { name: 'Patient ID', field: 'patient_id' },
            { name: 'Mobile Number', field: 'mobile' },
            { name: 'Status', field: 'status' }
        ];

        $scope.content = $scope.patients.map( function(patient){
          return {
            thumb: patient.profilePic, 
            name: patient.firstName + ' ' + patient.lastName,
            patient_id: patient.id,
            mobile: patient.mobile,
            status: patient.status
          }
        });

        $scope.custom = {name: 'bold', patient_id:'grey',mobile: 'grey',status: 'grey'};
        $scope.sortable = ['name', 'patient_id', 'mobile', 'status'];
        $scope.thumbs = 'thumb';
        $scope.count = 3;
    })
    .controller('AdminCtrl', function ($scope, UserService) {
        $scope.users = UserService.getUsers;
        $scope.toggleSearch = false;
        $scope.headers = [
            { name: '', field:'thumb' },
            { name: 'Name', field: 'name' },
            { name: 'User ID', field: 'patient_id' },
            { name: 'Mobile Number', field: 'mobile' },
            { name: 'Status', field: 'status' }
        ];

        $scope.content = $scope.users.map( function(user){
          return {
            thumb: user.profilePic, 
            name: user.name,
            patient_id: user.id,
            mobile: user.mobile,
            status: user.status
          }
        });

        $scope.custom = {name: 'bold', description:'grey',last_modified: 'grey'};
        $scope.sortable = ['name', 'description', 'last_modified'];
        $scope.thumbs = 'thumb';
        $scope.count = 3;
    })
    .controller('SignupCtrl', function ($scope, $location, UserService) {
        this.myDate = new Date();
        this.isOpen = false;

        $scope.signup = function() {
          $scope.user.type = 'Patient';
          $scope.user.id = 5616;
          if (UserService.addUser(angular.copy($scope.user))) {
            $location.path("/list");
          }
        }
    })
    .controller('HomeCtrl', function ($scope) {
        $scope.title = 'new 1 Home Page';
        $scope.body = 'This is the about docraft';
    })
    .factory('UserService', function ($cookies) {
        var users = [
              { id: 1, firstName: 'Telemed', lastName: 'Telemed', type: "Admin", name: 'Admin' },
              {
                id: 5614,
                title: "Mr",
                firstName: 'Chandra Shekhar',
                lastName: 'Roy',
                name: 'Chandra Shekhar Roy',
                email: 'chandra@tmd.com',
                profilePic: 'http://www.clipper-group.com/contacts/asia-pacific/india/mumbai/~/media/Images/Contacts/CGO.JPG?mw=698',
                address1: '509A 7th cross, 6thBlock, Koramangala',
                city: 'Bangalore',
                state: 'KA',
                country: 'IN', 
                mobile: '9916725543',
                age: 21,
                height: 180.0,
                weight:  80.0,
                bloodGroup: 'O+',
                fathersName: 'Rajnikant Roy',
                addlDetails: '',
                status: 'online',
                type: 'Patient'
              },
              { id: 2, title: "Dr", firstName: 'Dhruv', profilePic: 'http://www.allwhitebackground.com/images/3/3321.png',
                lastName: 'Joshi', name: "Dhruv Joshi", type: "Doc", email: 'dhruv@tmd.com', spec: 'Nephrologist', city: 'Bangalore'},
              { 
                id: 5615,
                title: "Mrs",
                firstName: 'Sujan',
                lastName: 'CH',
                name: 'Sujan CH',
                type: "Patient",
                email: 'sujan@tmd.com',
                mobile: '9916725425',
                status: 'online',
                profilePic: 'https://ak5.picdn.net/shutterstock/videos/4808225/thumb/1.jpg?i10c=img.resize(height:160)'
              },
              { id: 3, title: "Dr", firstName: 'Prasanna', lastName: 'Ganapa', 
                name: "Prasanna Ganapa", type: "Doc", email: 'prasanna@tmd.com', spec: 'Medicine', city: 'Pune'}
            ]
        var addUser = function (user) {
            users.push(user);
            return true;
        };

        var setCurrentUser = function (user) {
            $cookies.putObject('CurrUser', user);
            return true;
        };
        
        var getCurrentUser = function () {
            return $cookies.get('CurrUser');
        };

        var getUser = function (email) {
            for(var i=0; i< users.length; i++){
              if(users[i].email == email){
                return users[i];
                break;
              }
            };
        };
        var getUserById = function (id) {
          for(var i=0; i< users.length; i++){
            if(users[i].id == id){
              return users[i];
              break;
            }
          };
        };

        var getDoctors = function () {
          var docs = [];
          for(var i=0; i< users.length; i++){
            if(users[i].type === 'Doc'){
              docs.push(users[i]);
            }
          }
          return docs;
        };

        var getPatients = function () {
          var patients = [];
          for(var i=0; i< users.length; i++){
            if(users[i].type === 'Patient'){
              patients.push(users[i]);
            }
          }
          return patients;
        };
        return {
            getUser: getUser,
            getUsers: users,
            addUser: addUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            getUserById: getUserById,
            getDoctors: getDoctors,
            getPatients: getPatients
        }
    
    })
    .factory('MedService', function () {
      var meds = [
        {
          generic_name: 'Clopidogrel', 
          form: 'Tablet',
          medication: 'Clopitab',
          dose: '300 mg',
          schedule: 'Twice Daily',
          route: 'oral'
        },
        {
          generic_name: 'Aspirin', 
          form: 'Tablet',
          medication: 'Dispirin',
          dose: '375 mg',
          schedule: 'Once Daily',
          route: 'oral'
        }
      ];

      var addMed = function(med) {
        meds.push(med);
      }

      return {
        meds: meds,
        addMed: addMed
      }
    });
