module.exports = function ($scope, $routeParams, UserService, MedService) {
        $scope.patient = UserService.getUserById(parseInt($routeParams.id));

        $scope.goto = function(page) {
          console.log("Goto " + page);
        };

        $scope.addMed = function() {
          MedService.addMed(angular.copy($scope.med));
          $scope.content = MedService.meds;
        };
 
        $scope.tabs = [
          {title: 'History', content: 'content1'},,
          {title: 'Examination', content: 'content2'},
          {title: 'Vitals', content: 'content2'},
          {title: 'Reports', content: 'content2'},
          {title: 'Advice', content: 'content2'},
          {title: 'Medications', content: 'content2'},
          {title: 'Online', content: 'content2'},
          {title: 'Offline', content: 'content2'}
        ]
        $scope.toggleSearch = false;
        $scope.docheaders = [
            { name: 'Name', field: 'name'},
            { name: 'Specialization', field: 'spec' },
            { name: 'Location', field: 'city'}
        ];
        $scope.headers = [
            { name: 'Medication Name(Brand)', field: 'medication' },
            { name: 'Generic Name', field: 'generic_name' },
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
    };