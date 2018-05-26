import angular from 'angular';

import movieItemComponent from './movie-item.component';

export default angular
  .module('movie-item', [])
  .component('movieItem', movieItemComponent).name;
