var app = angular.module('docraft', ['ngRoute', 'ngAnimate', 'ngAria', 'ngMaterial' ])

app.run(function($rootScope, $location) {
        $rootScope.showAccountMenu = function($mdMenu, ev) {
            $mdMenu.open(ev);
        };

        $rootScope.loginPath = function() {
            return $location.url() === "/login";
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
    template: angular.element(document.querySelector('#md-table-template')).html()
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
    })
    .controller('LoginCtrl', function ($scope, $location, StateService) {
        $scope.title = 'About Page';
        $scope.body = 'This is the about page body';
        $scope.message = StateService.getMessage();
        $scope.login = true

        $scope.updateMessage = function (m) {
            StateService.setMessage(m);
        };
    })
    .controller('AssessmentCtrl', function ($scope, $routeParams, StateService, ExperimentsService) {
        $scope.title = 'Experiments Page';
        $scope.body = 'This is the about experiments body';
        $scope.patient_id = $routeParams.id

        $scope.goto = function(page) {
          console.log("Goto " + page);
        }
        $scope.message = StateService.getMessage();
        $scope.experiments = ExperimentsService.getExperiments();

        $scope.updateMessage = function (m) {
            StateService.setMessage(m);
        };


        $scope.toggleSearch = false;
        $scope.docapptype = '2';
        $scope.medapptype = '1';
        $scope.docheaders = [
            {
              name: 'Name', 
              field: 'name'
            },{
              name:'Specialization',
              field: 'spec'
            },{
              name: 'Location', 
              field: 'location'
            }
        ];
        $scope.headers = [
            {
              name: 'Medication Name(Brand)', 
              field: 'medication'
            },{
              name:'Generic Name',
              field: 'generic_name'
            },{
              name: 'Form', 
              field: 'form'
            },{
              name: 'Dose', 
              field: 'dose'
            },{
              name: 'Route', 
              field: 'route'
            },{
              name: 'Schedule', 
              field: 'schedule'
            }
        ];

        $scope.content = [
        {
          thumb:'https://lh3.googleusercontent.com/-5NfcdlvGQhs/AAAAAAAAAAI/AAAAAAAAABY/ibGrApGYTuQ/photo.jpg', 
          generic_name: 'Paracetamol 500mg', 
          form: 'Tablet',
          medication: 'Ranbaxy Paracep',
          dose: '1x3',
          schedule: 'Daily'
        },{
          thumb:'http://www.otakia.com/wp-content/uploads/V_1/article_3573/7405.jpg', 
          generic_name: 'Paracetamol 500mg', 
          form: 'Tablet',
          medication: 'Ranbaxy Paracep',
          dose: '1x3',
          schedule: 'Daily'
        },{
          thumb:'https://speakerdata.s3.amazonaws.com/photo/image/774492/Mark-Ronson-r24.jpg', 
          generic_name: 'Paracetamol 500mg', 
          form: 'Tablet',
          medication: 'Ranbaxy Paracep',
          dose: '1x3',
          schedule: 'Daily'
        },{
          thumb:'https://25.media.tumblr.com/61ebf04c3cc7a84944aa0246e902f2a7/tumblr_mm35b87dGz1qmwrnuo1_1280.jpg', 
          generic_name: 'Paracetamol 500mg', 
          form: 'Tablet',
          medication: 'Ranbaxy Paracep',
          dose: '1x3',
          schedule: 'Daily'
        },{
          thumb:'http://thatgrapejuice.net/wp-content/uploads/2014/03/lady-gaga-that-grape-juice-televisionjpg.jpg', 
          generic_name: 'Paracetamol 500mg', 
          form: 'Tablet',
          medication: 'Ranbaxy Paracep',
          dose: '1x3',
          schedule: 'Daily'
        }
        ];

        $scope.doccontent = [
        {
          name: 'Dr Dhruv Joshi', 
          spec: 'Nephrologist',
          location: 'Bangalore'
        }
        ];

        $scope.custom = {medication: 'bold', form:'grey',generic_name: 'grey',dose: 'grey',schedule: 'grey'};
        $scope.sortable = ['medication','generic_name', 'form', 'dose', 'route', 'schedule'];
        $scope.thumbs = 'thumb';
        $scope.count = 3;
        $scope.doccustom = {name: 'bold', spec:'grey',location: 'grey'};
        $scope.docsortable = ['name','spec', 'location'];
        $scope.docthumbs = 'thumb';
        $scope.doccount = 3;
    })
    .controller('ListCtrl', function ($scope, StateService) {
        $scope.title = 'Home Page';
        $scope.body = 'This is the about home body';

        $scope.message = StateService.getMessage();

        $scope.updateMessage = function (m) {
            StateService.setMessage(m);
        };


        $scope.toggleSearch = false;
        $scope.headers = [
            {
              name:'',
              field:'thumb'
            },{
              name: 'Name', 
              field: 'name'
            },{
              name:'Patient ID', 
              field: 'patient_id'
            },{
              name: 'Mobile Number', 
              field: 'mobile'
            },{
              name: 'Status', 
              field: 'status'
            }
        ];

        $scope.content = [
        {
          thumb:'https://lh3.googleusercontent.com/-5NfcdlvGQhs/AAAAAAAAAAI/AAAAAAAAABY/ibGrApGYTuQ/photo.jpg', 
          name: 'Bruno Mars', 
          patient_id: '1131',
          mobile: '834-234-5568',
          status: '<a>online</a>'
        },{
          thumb:'http://www.clipper-group.com/contacts/asia-pacific/india/mumbai/~/media/Images/Contacts/CGO.JPG?mw=698', 
          name: 'Chandra Sekhar Roy', 
          patient_id: '5614',
          mobile: '991-672-5543',
          status: 'online'
        },{
          thumb:'https://speakerdata.s3.amazonaws.com/photo/image/774492/Mark-Ronson-r24.jpg', 
          name: 'Mark Ronson', 
          patient_id: '4231',
          mobile: '956-342-7768',
          status: 'offline'
        },{
          thumb:'https://25.media.tumblr.com/61ebf04c3cc7a84944aa0246e902f2a7/tumblr_mm35b87dGz1qmwrnuo1_1280.jpg', 
          name: 'Daft Punk', 
          patient_id: '931',
          mobile: '857-687-4875',
          status: 'offline'
        },{
          thumb:'http://thatgrapejuice.net/wp-content/uploads/2014/03/lady-gaga-that-grape-juice-televisionjpg.jpg', 
          name: 'Lady Gaga', 
          patient_id: '451',
          mobile: '657-384-9586',
          status: 'online'
        }
        ];

        $scope.custom = {name: 'bold', patient_id:'grey',mobile: 'grey',status: 'grey'};
        $scope.sortable = ['name', 'patient_id', 'mobile', 'status'];
        $scope.thumbs = 'thumb';
        $scope.count = 3;
    })
    .controller('AdminCtrl', function ($scope, StateService, ExperimentsService) {
        $scope.title = 'Experiments Page';
        $scope.body = 'This is the about experiments body';

        $scope.message = StateService.getMessage();
        $scope.experiments = ExperimentsService.getExperiments();

        $scope.updateMessage = function (m) {
            StateService.setMessage(m);
        };

        $scope.toggleSearch = false;
        $scope.headers = [
            {
              name:'',
              field:'thumb'
            },{
              name: 'Name', 
              field: 'name'
            },{
              name:'Description', 
              field: 'description'
            },{
              name: 'Last Modified', 
              field: 'last_modified'
            }
        ];

        $scope.content = [
        {
          thumb:'https://lh3.googleusercontent.com/-5NfcdlvGQhs/AAAAAAAAAAI/AAAAAAAAABY/ibGrApGYTuQ/photo.jpg', 
          name: 'Bruno Mars', 
          description: 'Human',
          last_modified: 'Jun 5, 2014'
        },{
          thumb:'http://www.otakia.com/wp-content/uploads/V_1/article_3573/7405.jpg', 
          name: 'AT-AT', 
          description: 'Robot',
          last_modified: 'Jun 5, 2014'
        },{
          thumb:'https://speakerdata.s3.amazonaws.com/photo/image/774492/Mark-Ronson-r24.jpg', 
          name: 'Mark Ronson', 
          description: 'Human',
          last_modified: 'Jun 5, 2014'
        },{
          thumb:'https://25.media.tumblr.com/61ebf04c3cc7a84944aa0246e902f2a7/tumblr_mm35b87dGz1qmwrnuo1_1280.jpg', 
          name: 'Daft Punk', 
          description: 'Human-Robot',
          last_modified: 'Jun 5, 2014'
        },{
          thumb:'http://thatgrapejuice.net/wp-content/uploads/2014/03/lady-gaga-that-grape-juice-televisionjpg.jpg', 
          name: 'Lady Gaga', 
          description: 'Undefined',
          last_modified: 'Jun 5, 2014'
        }
        ];

        $scope.custom = {name: 'bold', description:'grey',last_modified: 'grey'};
        $scope.sortable = ['name', 'description', 'last_modified'];
        $scope.thumbs = 'thumb';
        $scope.count = 3;
    })
    .controller('SignupCtrl', function ($scope, StateService) {
        this.myDate = new Date();
        this.isOpen = false;
        $scope.title = 'Home Page';
        $scope.body = 'This is the about home body';

        $scope.message = StateService.getMessage();

        $scope.updateMessage = function (m) {
            StateService.setMessage(m);
        };
    })
    .controller('HomeCtrl', function ($scope, StateService) {
        $scope.title = 'new 1 Home Page';
        $scope.body = 'This is the about docraft';

        $scope.message = StateService.getMessage();

        $scope.updateMessage = function (m) {
            StateService.setMessage(m);
        };
    })
    .factory('StateService', function () {
        var message = 'Hello Message';
        var getMessage = function () {
            return message;
        };
        var setMessage = function (m) {
            message = m;
        };

        return {
            getMessage: getMessage,
            setMessage: setMessage
        }
    })
    .service('ExperimentsService', function () {
        var service = this,
            experiments = [
                {name: 'Experiment 1', description: 'This is an experiment', completed:0},
                {name: 'Experiment 2', description: 'This is an experiment', completed:0},
                {name: 'Experiment 3', description: 'This is an experiment', completed:0},
                {name: 'Experiment 4', description: 'This is an experiment', completed:0}
            ];

        service.getExperiments = function() {
            return experiments;
        };
    })
    .directive('experiment', function(){
        var linker = function (scope, element, attrs) {
            element.on('click', function(){
                scope.doExperiment();
            })
        };

        var controller =  function($scope){
            $scope.doExperiment = function() {
                $scope.$apply(function(){
                    $scope.experiment.completed++;
                });
            };
        };

        return {
            scope: true,
            restrict: 'E',
            template: '<div class="experiment">' +
                '<h3>{{experiment.name}}</h3>' +
                '<p>{{experiment.description}}</p>' +
                '<p><strong>{{experiment.completed}}</strong></p>' +
                '</div>',
            link: linker,
            controller: controller
        }
    });