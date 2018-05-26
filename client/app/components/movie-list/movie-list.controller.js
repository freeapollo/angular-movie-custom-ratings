class MovieListController {
  $onInit() {
    this.sortBy = 'title';
    this.sortDirection = 'asc';
  }
  $onChanges(changes) {
    const { movies } = changes;
    if (movies) {
      this.movies = movies.currentValue;
    }
  }
  handleMovieUpdate(movie) {
    if (this.onUpdate) {
      this.onUpdate({ movie });
    }
  }
}

export default MovieListController;
