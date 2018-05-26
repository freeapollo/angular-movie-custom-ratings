import HomeModule from './home';

describe('Home', () => {
  let $rootScope;
  let $state;
  let $location;
  let $componentController;
  let $compile;
  let $q;
  let MovieServiceMock;
  let findAllDeferred;

  function createMovieServiceMock() {
    findAllDeferred = $q.defer();

    MovieServiceMock = jasmine.createSpyObj('MovieService', ['findAll']);
    MovieServiceMock.findAll = jasmine
      .createSpy('findAll')
      .and.returnValue(findAllDeferred.promise);
    return MovieServiceMock;
  }

  beforeEach(() => {
    window.module(HomeModule);
    window.module($provide => {
      $provide.service('MovieService', createMovieServiceMock);
    });
  });

  beforeEach(
    inject($injector => {
      $rootScope = $injector.get('$rootScope');
      $componentController = $injector.get('$componentController');
      $state = $injector.get('$state');
      $location = $injector.get('$location');
      $compile = $injector.get('$compile');
      $q = $injector.get('$q');
    })
  );

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
    it(`should register home as default route's component`, () => {
      $location.url('/');
      $rootScope.$digest();
      expect($state.current.component).toBe('home');
    });
  });

  describe('Controller', () => {
    // controller specs
    let controller;
    beforeEach(() => {
      controller = $componentController('home', {});
    });

    it('should initialize an empty array to contain movies', () => {
      controller.$onInit();
      expect(controller.movies).toEqual([]);
    });

    it('should update movies array when http response resolved', () => {
      const response = { foo: 'bar' };

      controller.$onInit();
      findAllDeferred.resolve(response);
      $rootScope.$digest();

      expect(controller.movies).toBe(response);
    });

    it('should handle movies update correctly', () => {
      const movies = [
        { id: 1, rating: 1 },
        { id: 2, rating: 2 },
        { id: 3, rating: 3 },
      ];
      const updatedMovie = { id: 1, rating: 5 };

      controller.movies = movies;
      controller.handleMoviesUpdate(updatedMovie);

      expect(controller.movies).not.toBe(movies);
      expect(controller.movies[0]).toBe(updatedMovie);
      expect(controller.movies[1]).toBe(movies[1]);
      expect(controller.movies[2]).toBe(movies[2]);
    });
  });

  describe('View', () => {
    // view layer specs.
    let scope, template;

    beforeEach(() => {
      scope = $rootScope.$new();
      template = $compile('<home></home>')(scope);
      scope.$apply();
    });

    it('should show a spinner icon while loading', () => {
      expect(template[0].querySelector('.fa-spinner')).toBeDefined();
    });

    it('should not show a spinner icon after http response resolved', () => {
      findAllDeferred.resolve([{ foo: 'bar' }]);
      $rootScope.$digest();
      expect(template[0].querySelector('.fa-spinner')).toBeNull();
    });
  });
});
