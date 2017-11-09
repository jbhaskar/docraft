import "../css/base.scss";
import '../images/nouns/capsule1.svg';
import '../images/nouns/stetho.svg';
import '../images/nouns/chems.svg';
import '../images/nouns/report.svg';
import '../images/examination.svg';
import '../images/History.svg';
import '../images/online.png';
import '../images/offline.png';
import '../images/cardio.png';
import '../images/nephro.png';
import '../images/physician.png';
import '../images/neuro.png';
import '../images/opthalm.png';
import '../images/ent.png';
import '../images/ortho.png';
import '../images/pedia.png';
import '../images/rheuma.png';
import '../images/gyno.png';
import '../images/gastro.svg';
import '../images/uro.png';
import '../images/nutri.svg';
import '../images/plastic.png';
import '../images/pain.png';
import '../images/pulmo.png';
import '../images/derma.png';
import '../images/psych.png';
import '../images/derma.png';
import '../images/Vitals.svg';
import '../images/Advice.svg';
import '../images/Medication.svg';
import '../images/Consultation.svg';
import '../images/Report.svg';
import '../images/Sujan.jpg';
import '../images/Chandra.jpg';
import '../images/nouns/heartReport.svg';
import '../images/nouns/medconsult.svg';
import '../images/top-shadow.png';
import '../tmd.pdf';
// import '../images/bckgrnd.jpeg';
import 'bootstrap/dist/css/bootstrap.css';
import mdTable from './directives/mdTable.js';
import chooseFile from './directives/chooseFile.js';
import adminCtrl from './controllers/adminCtrl.js';
import assessCtrl from './controllers/assessCtrl.js';
import listCtrl from './controllers/listCtrl.js';
import loginCtrl from './controllers/loginCtrl.js';
import signupCtrl from './controllers/signupCtrl.js';
import userService from './services/userService.js';
import medService from './services/medService.js';
import appConfig from './config.js';
import ghelpers from './ghelpers.js';
// import 'bootstrap';

import htmlCode from '../partials/login.html';
import angular from 'angular';
import angularRoute from 'angular-route';
import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
import angularCookies from 'angular-cookies';
import angularMaterial from 'angular-material';
// import angularCookies from 'angular-cookies';

// var angular = require('angular');

var app = angular.module('docraft', ['ngRoute', 'ngAnimate', 'ngAria', 'ngMaterial', 'ngCookies' ]);

app.config(appConfig)
.run(ghelpers)
.controller('LoginCtrl', loginCtrl)
.controller('AssessmentCtrl', assessCtrl)
.controller('ListCtrl', listCtrl)
.controller('AdminCtrl', adminCtrl)
.controller('SignupCtrl', signupCtrl)
.factory('UserService', userService)
.factory('MedService', medService)
.directive('mdTable', mdTable)
.directive('chooseFile', chooseFile)
.filter('startFrom',function (){
  return function (input,start) {
    start = +start;
    return input.slice(start);
  }
});