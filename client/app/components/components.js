import angular from 'angular';

import Home from './home/home';
import MovieItem from './movie-item/movie-item';
import MovieList from './movie-list/movie-list';
import RatingBarChart from './rating-bar-chart/rating-bar-chart';
import StarRating from './star-rating/star-rating';

export default angular.module('app.components', [
  Home,
  MovieItem,
  MovieList,
  StarRating,
  RatingBarChart,
]).name;
