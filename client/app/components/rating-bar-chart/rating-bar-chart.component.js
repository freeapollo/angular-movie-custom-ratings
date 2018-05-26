import './rating-bar-chart.scss';

import controller from './rating-bar-chart.controller';
import template from './rating-bar-chart.html';

const ratingBarChartComponent = {
  bindings: {
    movies: '<',
    labels: '<?',
  },
  template,
  controller,
};

export default ratingBarChartComponent;
