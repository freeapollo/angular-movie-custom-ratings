import RatingBarChartModule from './rating-bar-chart';
import RatingBarChartController from './rating-bar-chart.controller';

describe('RatingBarChart', () => {
  let $rootScope, $compile, makeController;

  beforeEach(window.module(RatingBarChartModule));

  beforeEach(
    inject((_$rootScope_, _$compile_) => {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      makeController = () => new RatingBarChartController();
    })
  );

  describe('Controller', () => {
    // controller specs
    it('should set default labels', () => {
      const controller = makeController();
      expect(controller.labels).toBeDefined();
    });
    it('should compute data on changes correctly', () => {
      const controller = makeController();
      controller.labels = ['0', '1', '2'];
      controller.data = null;
      controller.movies = [{ id: 1, rating: 1 }, { id: 2, rating: 2 }];
      controller.$onChanges({ movies: 'foo' });
      expect(controller.data).toEqual([0, 1, 1]);
    });
  });

  describe('View', () => {
    // view layer specs.
    let scope, template;

    beforeEach(() => {
      scope = $rootScope.$new();
      scope.movies = [];
      template = $compile(
        '<rating-bar-chart movies="movies"></rating-bar-chart>'
      )(scope);
      scope.$apply();
    });

    it('should render a canvas', () => {
      expect(template[0].querySelector('canvas')).toBeDefined();
    });
  });
});
