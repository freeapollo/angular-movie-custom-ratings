import MovieItemModule from './movie-item';
import MovieItemController from './movie-item.controller';

describe('Movie-item', () => {
  let $rootScope, makeController;

  beforeEach(window.module(MovieItemModule));

  beforeEach(
    inject(_$rootScope_ => {
      $rootScope = _$rootScope_;
      makeController = () => new MovieItemController();
    })
  );

  describe('Controller', () => {
    // controller specs
    it('should init a releaseDateFormat', () => {
      // erase if removing this.name from the controller
      const controller = makeController();
      expect(controller.releaseDateFormat).toBeDefined();
    });

    it('should handle movie update correctly', () => {
      const controller = makeController();
      controller.onUpdate = jasmine.createSpy('onUpdate');
      controller.movie = {
        id: 1,
        title: 'title',
        image: 'image',
        rating: 1,
        releaseDate: '2018-01-01',
      };
      controller.updateRating(2);
      expect(controller.onUpdate).toHaveBeenCalled();
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    // it('has name in template [REMOVE]', () => {
    //   expect(MovieItemTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    // });
  });
});
