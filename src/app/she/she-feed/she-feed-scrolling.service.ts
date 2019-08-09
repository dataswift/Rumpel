
export class SheFeedScrollingService {
  private scrollingInitIndex = {startDate: 0, endDate: 0};
  private scrollingUpIndex = {startDate: 0, endDate: 0};
  private scrollingDownIndex = {startDate: 0, endDate: 0};
  private readonly moreDataStep = 3;
  private todayIndex: number;
  private feedListLength: number;

  constructor() {
  }

  /**
   * Takes the today index and the feed length and initialise the indexes
   * @param todayIndex the index of the today index
   * @param feedListLength the length of the feed array
   */
  init(todayIndex: number, feedListLength: number) {
    this.feedListLength = feedListLength;
    this.todayIndex = todayIndex > 0 ? todayIndex : 0;

    this.scrollingUpIndex.endDate = todayIndex - 1;
    this.scrollingUpIndex.startDate = todayIndex - 3 > 0 ? todayIndex - 3 : 0;

    this.scrollingDownIndex.endDate = todayIndex + 3 < feedListLength ? todayIndex + 3 : feedListLength;
    this.scrollingDownIndex.startDate = todayIndex + 1;

    this.scrollingInitIndex.startDate = this.scrollingUpIndex.startDate;
    this.scrollingInitIndex.endDate = this.scrollingDownIndex.endDate;
  }

  /**
   * Returns the initialize indexes for the feed
   */
  getFeedInitIndexes() {
    return this.scrollingInitIndex
  }

  /**
   * Set the feed length
   * @param feedLength the length of the feed array
   */
  setFeedLength(feedLength: number) {
    this.feedListLength = feedLength
  }

  /**
   * When the user scrolling up, this method calculates the indexes
   * @returns scrollingUpIndex with startDate and EndDate
   */
  onScrollingUp() {
    if (this.feedListLength === 0) {
      this.scrollingUpIndex.startDate = 0;
      this.scrollingUpIndex.endDate = 0;

      return this.scrollingUpIndex;
    }
    const tempUpIndex = this.scrollingUpIndex;

    this.scrollingUpIndex.endDate = this.scrollingUpIndex.startDate - 1;
    this.scrollingUpIndex.startDate = this.getMoreFutureData() > 0 ? this.getMoreFutureData() : 0;

    return tempUpIndex;
  }

  /**
   * When the user scrolling down, this method calculates the indexes
   * @returns scrollingDownIndex with startDate and EndDate
   */
  onScrollingDown() {
    if (this.feedListLength === 0) {
      this.scrollingDownIndex.startDate = 0;
      this.scrollingDownIndex.endDate = 0;

      return this.scrollingDownIndex;
    }
    const tempDownIndex = this.scrollingDownIndex;

    this.scrollingDownIndex.startDate = this.scrollingDownIndex.endDate + 1;
    this.scrollingDownIndex.endDate =
      this.scrollingDownIndex.startDate + 3 < this.feedListLength ? this.scrollingDownIndex.startDate + 3 : this.feedListLength;

    return tempDownIndex
  }

  /**
   * This method checks if there are more future data
   * @returns 0 if there are not future dates or more days calculated by the month step.
   */
  getMoreFutureData(): number {
    if (this.scrollingUpIndex.startDate > 0 && this.scrollingUpIndex.startDate - this.moreDataStep > 0) {
      return this.scrollingUpIndex.startDate - this.moreDataStep;
    }

    return 0;
  }
}
