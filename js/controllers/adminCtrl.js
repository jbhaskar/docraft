module.exports = function ($scope, UserService) {
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
    };