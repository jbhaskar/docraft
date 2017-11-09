module.exports = function ($cookies) {
        var users = [
              { id: 1, firstName: 'Telemed', lastName: 'Telemed', type: "Admin", name: 'Admin' },
              {
                id: 5614,
                title: "Mr",
                firstName: 'Chandra Shekhar',
                gender: "male",
                lastName: 'Roy',
                name: 'Chandra Shekhar Roy',
                email: 'chandra@tmd.com',
                profilePic: '../images/Chandra.jpg',
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
                title: "Miss",
                firstName: 'Sujan',
                lastName: 'CH',
                name: 'Sujan CH',
                gender: 'female',
                type: "Patient",
                email: 'sujan@tmd.com',
                mobile: '9916725425',
                status: 'online',
                profilePic: '../images/Sujan.jpg'
              },
              { id: 3, title: "Dr", firstName: 'Prasanna', lastName: 'Ganapa', 
                name: "Prasanna Ganapa", type: "Doc", email: 'prasanna@tmd.com', spec: 'Physician', city: 'Pune'}
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
    
    };