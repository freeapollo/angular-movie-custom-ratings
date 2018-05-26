const DEFAULT_LABELS = ['Not Rated', '1', '2', '3', '4', '5'];

class RatingBarChartController {
  constructor() {
    this.labels = this.labels || DEFAULT_LABELS;
  }
  $onChanges(changes) {
    if (changes.movies) {
      this.computeData();
    }
  }
  computeData() {
    this.data = this.movies.reduce((memo, movie) => {
      memo[movie.rating]++;
      return memo;
    }, Array(this.labels.length).fill(0));
  }
}

export default RatingBarChartController;
