module.exports = function () {
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
    };