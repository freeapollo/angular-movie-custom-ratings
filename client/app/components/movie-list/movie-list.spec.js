import MovieListModule from './movie-list';

describe('MovieList', () => {
  let $rootScope, $compile, $componentController;

  beforeEach(window.module(MovieListModule));

  beforeEach(
    inject($injector => {
      $rootScope = $injector.get('$rootScope');
      $componentController = $injector.get('$componentController');
      $compile = $injector.get('$compile');
    })
  );

  describe('Controller', () => {
    let controller;

    beforeEach(() => {
      controller = $componentController('movieList', {});
    });

    describe('$onInit', () => {
      it('should init sortBy to title', () => {
        controller.$onInit();
        expect(controller.sortBy).toBe('title');
      });

      it('should init sortDirection to asc', () => {
        controller.$onInit();
        expect(controller.sortDirection).toBe('asc');
      });
    });
    describe('$onChanges', () => {
      it('should update movies', () => {
        const movies = [{ id: 1, title: 'movie 1' }];
        controller.movies = null;
        controller.$onChanges({ movies: { currentValue: movies } });
        expect(controller.movies).toBe(movies);
      });
    });
    describe('handleMovieUpdate', () => {
      it('call onUpdate callback method', () => {
        const updatedMovie = { id: 1, title: 'movie 1' };
        controller.onUpdate = jasmine.createSpy('onUpdate');
        controller.handleMovieUpdate(updatedMovie);
        expect(controller.onUpdate).toHaveBeenCalledWith({
          movie: updatedMovie,
        });
      });
    });
  });

  describe('View', () => {
    // view layer specs.
    let scope, template, movies;

    beforeEach(() => {
      movies = [{ id: 1 }, { id: 2 }, { id: 3 }];

      scope = $rootScope.$new();
      scope.movies = movies;

      template = $compile('<movie-list movies="movies"></movie-list>')(scope);
      scope.$apply();
    });

    it('should render movie-item correctly', () => {
      const movieItems = template[0].querySelectorAll('movie-item');
      expect(movieItems.length).toBe(movies.length);
    });
  });
});
