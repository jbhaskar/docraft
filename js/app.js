import '../css/base.scss';
import '../images/capsule1.svg';
import '../images/stetho.svg';
import '../images/chems.svg';
import '../images/report.svg';
import '../images/heartreport.svg';
import '../images/medconsult.svg';
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