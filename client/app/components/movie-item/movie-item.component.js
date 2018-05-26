import './movie-item.scss';

import controller from './movie-item.controller';
import template from './movie-item.html';

const movieItemComponent = {
  bindings: {
    movie: '<',
    onUpdate: '&',
  },
  template,
  controller,
};

export default movieItemComponent;
