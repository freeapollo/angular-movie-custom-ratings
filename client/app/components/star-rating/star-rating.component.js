import './star-rating.scss';

import controller from './star-rating.controller';
import template from './star-rating.html';

const starRatingComponent = {
  bindings: {
    ratingValue: '<',
    max: '<?',
    readonly: '<?',
    onSelect: '&',
  },
  template,
  controller,
};

export default starRatingComponent;
