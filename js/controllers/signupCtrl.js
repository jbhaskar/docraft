module.exports = function ($scope,$http, $cookies, $location, UserService) {
        this.myDate = new Date();
        this.isOpen = false;

        $scope.signup = function($cookies, patient) {
          debugger;
          patient.context = { userId: 1, clinicId: 1, hospitalId: 1 };
          
          $http({ method: 'POST',
            url: 'http://0.0.0.0:2020/save-patient',
            data: patient,
            headers: {'Content-Type': 'application/json'}
          }).then( function (response) {
            console.log("=======response====================");
            console.log(response.data);
            $location.path("/list");
          }, function (error) {
            console.log("===============error============");
            console.log(JSON.stringify(error));
          });



        }
    };