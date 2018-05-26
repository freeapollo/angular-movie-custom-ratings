import 'bootstrap/scss/bootstrap.scss';

import angular from 'angular';
import chart from 'angular-chart.js';
import uiRouter from 'angular-ui-router';

import AppComponent from './app.component';
import Components from './components/components';
import Services from './services/services';

angular
  .module('app', [uiRouter, chart, Components, Services])
  .config($locationProvider => {
    'ngInject';

    $locationProvider.html5Mode(true).hashPrefix('!');
  })
  .component('app', AppComponent);
