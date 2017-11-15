module.exports = function ($scope, $http, UserService) {
        $http({ method: 'GET',
          url: 'http://0.0.0.0:2020/get-patients'
        }).then( function (response) {
          console.log("=======response====================");
          console.log(response.data);
          // debugger;
          $scope.patients = response.data;

            $scope.content = $scope.patients.map( function(patient){
              return {
                thumb: 'http://www.allwhitebackground.com/images/3/3321.png', 
                name: patient.firstName + ' ' + patient.lastName,
                patient_id: patient.mrn,
                mobile: 'patient.mobile',
                address: patient.address,
                city: patient.city,
                state: patient.state,
                country: patient.country,
                pincode: patient.pincode,
                bloodGroup: patient.bloodGroup,
                gender: patient.gender,
                age: patient.age
              }
            });

        }, function (error) {
          console.log("===============error============");
          console.log(JSON.stringify(error));
        });


        // $scope.patients = UserService.getPatients();
        console.log("patients================================================");
        console.log($scope.patients);
        $scope.currentUser = UserService.getCurrentUser();
        $scope.toggleSearch = false;
        $scope.headers = [
            { name: '', field:'thumb' },
            { name: 'Name', field: 'name' },
            { name: 'Patient ID', field: 'patient_id' },
            { name: 'Mobile Number', field: 'mobile' },
            { name: 'Gender', field: 'gender' },
            { name: 'Age', field: 'age' },
            { name: 'Blood Group', field: 'bloodGroup' },
            { name: 'Address', field: 'address' },
            { name: 'City', field: 'city' },
            { name: 'State', field: 'state' },
            { name: 'Country', field: 'country' },
            { name: 'Pincode', field: 'pincode' }
        ];


        $scope.custom = {name: 'bold', patient_id:'grey',mobile: 'grey',status: 'grey'};
        $scope.sortable = ['name', 'patient_id', 'mobile', 'status'];
        $scope.thumbs = 'thumb';
        $scope.count = 10;
    };