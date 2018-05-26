import angular from 'angular';

import starRatingComponent from './star-rating.component';

export default angular
  .module('star-rating', [])
  .component('starRating', starRatingComponent).name;
