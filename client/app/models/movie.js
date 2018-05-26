class Movie {
  constructor(id, title, image, rating, releaseDate) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.rating = rating;
    this.releaseDate = releaseDate;
  }

  get isReleased() {
    return new Date(this.releaseDate).getTime() <= new Date().getTime();
  }

  get ratingText() {
    return this.rating > 0 ? `Rating ${this.rating}` : 'Not Rated';
  }
}

Movie.fromJson = function({ $id, title, image, rating, releaseDate }) {
  return new Movie(
    parseInt($id, 10),
    title,
    image,
    parseInt(rating, 10),
    releaseDate
  );
};

export default Movie;
