import './movie-list.scss';

import controller from './movie-list.controller';
import template from './movie-list.html';

const movieListComponent = {
  bindings: {
    movies: '<',
    onUpdate: '&',
  },
  template,
  controller,
};

export default movieListComponent;
