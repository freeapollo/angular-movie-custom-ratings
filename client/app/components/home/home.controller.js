class HomeController {
  constructor(MovieService) {
    'ngInject';

    this.MovieService = MovieService;
  }

  $onInit() {
    this.movies = [];
    this.MovieService.findAll().then(movies => {
      this.movies = movies;
    });
  }

  handleMoviesUpdate(movie) {
    this.movies = this.movies.map(m => (m.id === movie.id ? movie : m));
  }
}

export default HomeController;
