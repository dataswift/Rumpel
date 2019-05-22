import { DayGroupedSheFeed } from '../she-feed.interface';

export class SheFeedScrollingService {
  private scrollingUpIndex = {startDate: 0, endDate: 0};
  private scrollingDownIndex = {startDate: 0, endDate: 0};
  private readonly moreDataStep = 3;
  private todayIndex: number;
  private feedListLength: number;

  constructor() {
  }

  init(todayIndex: number, feedListLength: number) {
    this.feedListLength = feedListLength;
    this.todayIndex = todayIndex > 0 ? todayIndex : 0;

    this.scrollingUpIndex.endDate = todayIndex - 1;
    this.scrollingUpIndex.startDate = todayIndex - 3 > 0 ? todayIndex - 3 : 0;

    this.scrollingDownIndex.endDate = todayIndex + 3 < feedListLength ? todayIndex + 3 : feedListLength;
    this.scrollingDownIndex.startDate = todayIndex + 1;
  }

  setFeedLength(feedLength) {
    this.feedListLength = feedLength
  }

  onScrollingUp() {
    this.scrollingUpIndex.endDate = this.scrollingUpIndex.startDate - 1;
    this.scrollingUpIndex.startDate = this.getMoreFutureData() > 0 ? this.getMoreFutureData() : 0;

    return this.scrollingUpIndex;
  }

  onScrollingDown() {
    this.scrollingDownIndex.startDate = this.scrollingDownIndex.endDate + 1;
    this.scrollingDownIndex.endDate =
      this.scrollingDownIndex.endDate + 3 < this.feedListLength ? this.scrollingDownIndex.endDate + 3 : this.feedListLength;

    return this.scrollingDownIndex;
  }

  getMoreFutureData(): number {
    if (this.scrollingUpIndex.startDate > 0 && this.scrollingUpIndex.startDate - this.moreDataStep > 0) {
      return this.scrollingUpIndex.startDate - this.moreDataStep;
    }

    return 0;
  }
}
