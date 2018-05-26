import Movie from '../models/movie';

export default class MovieService {
  constructor($http) {
    'ngInject';

    this.$http = $http;
  }

  findAll() {
    return this.$http
      .get('movies.json')
      .then(resp => resp.data.map(Movie.fromJson));
  }
}
