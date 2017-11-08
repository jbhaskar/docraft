module.exports = function ($scope, UserService) {
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
    };