class StarRatingController {
  constructor() {
    this.max = this.max || 5;
  }

  updateStars() {
    this.stars = [];
    for (let i = 0; i < this.max; i++) {
      this.stars.push({
        filled: i < this.ratingValue,
      });
    }
  }

  handleStarClick(index) {
    if (!this.readonly) {
      this.ratingValue = index + 1;
      this.updateStars();
      this.onSelect({
        rating: this.ratingValue,
      });
    }
  }

  $onChanges(changes) {
    const { ratingValue } = changes;
    if (ratingValue) {
      this.updateStars();
    }
  }
}

export default StarRatingController;
