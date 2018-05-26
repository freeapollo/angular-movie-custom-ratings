import Movie from '../../models/movie';

const RELEASE_DATE_FORMAT = 'dd-MMM-yy';

class MovieItemController {
  constructor() {
    this.releaseDateFormat = RELEASE_DATE_FORMAT;
  }
  updateRating(rating) {
    if (this.onUpdate) {
      this.onUpdate({
        movie: new Movie(
          this.movie.id,
          this.movie.title,
          this.movie.image,
          rating,
          this.movie.releaseDate
        ),
      });
    }
  }
}

export default MovieItemController;
