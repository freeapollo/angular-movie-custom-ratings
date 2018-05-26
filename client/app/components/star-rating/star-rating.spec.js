import StarRatingModule from './star-rating';
import StarRatingController from './star-rating.controller';

describe('StarRating', () => {
  let $rootScope, makeController;

  beforeEach(window.module(StarRatingModule));
  beforeEach(
    inject(_$rootScope_ => {
      $rootScope = _$rootScope_;
      makeController = () => new StarRatingController();
    })
  );

  describe('Controller', () => {
    let controller;

    beforeEach(() => {
      controller = makeController();
    });

    it('should set default number of stars if not provided', () => {
      expect(controller.max).toBeDefined();
    });

    describe('$onChanges', () => {
      it('should update stars array correctly', () => {
        controller.max = 2;
        controller.ratingValue = 1;
        controller.$onChanges({ ratingValue: true });
        expect(controller.stars.length).toBe(2);
        expect(controller.stars[0].filled).toBe(true);
        expect(controller.stars[1].filled).toBe(false);
      });
    });

    describe('handleStarClick', () => {
      beforeEach(() => {
        controller.onSelect = jasmine.createSpy('onSelect');
      });

      it('should not call the callback onSelect when readonly', () => {
        controller.readonly = true;
        controller.handleStarClick();
        expect(controller.onSelect).not.toHaveBeenCalled();
      });

      it('should call the callback onSelect when readonly is false', () => {
        controller.readonly = false;
        controller.handleStarClick(2);
        expect(controller.onSelect).toHaveBeenCalled();
      });
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    // it('has name in template [REMOVE]', () => {
    //   expect(StarRatingTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    // });
  });
});
