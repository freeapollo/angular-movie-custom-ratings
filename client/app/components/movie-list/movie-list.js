import angular from 'angular';

import movieListComponent from './movie-list.component';

export default angular
  .module('movie-list', [])
  .component('movieList', movieListComponent).name;
