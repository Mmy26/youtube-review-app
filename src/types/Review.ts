import { Videos } from "./Videos";

export class Review {
  constructor(
    //レビュー投稿日
    private _reviewDate: string,
    //レビューID
    private _reviewId: number,
    //アカウントID
    private _accountId: number,
    //アカウント名
    private _accountName: string,
    //アカウントアイコン
    private _accountIcon: string,
    //動画
    private _videos: Videos,
    //レビュー評価
    private _evaluation: number,
    //レビュー
    private _review: string,
    //いいね数
    private _favoriteCount: Array<number>
  ) {}

  public get reviewDate(): string {
    return this._reviewDate;
  }

  public set reviewDate(reviewDate: string) {
    this._reviewDate = reviewDate;
  }

  public get reviewId(): number {
    return this._reviewId;
  }

  public set reviewId(reviewId: number) {
    this._reviewId = reviewId;
  }

  public get accountId(): number {
    return this._accountId;
  }

  public set accountId(accountId: number) {
    this._accountId = accountId;
  }

  public get accountName(): string {
    return this._accountName;
  }

  public set accountName(accountName: string) {
    this._accountName = accountName;
  }

  public get accountIcon(): string {
    return this._accountIcon;
  }

  public set accountIcon(accountIcon: string) {
    this._accountIcon = accountIcon;
  }

  public get videos(): Videos {
    return this._videos;
  }

  public set videos(videos: Videos) {
    this._videos = videos;
  }

  public get evaluation(): number {
    return this._evaluation;
  }

  public set evaluation(evaluation: number) {
    this._evaluation = evaluation;
  }

  public get review(): string {
    return this._review;
  }

  public set review(review: string) {
    this._review = review;
  }

  public get favoriteCount(): Array<number> {
    return this._favoriteCount;
  }

  public set favoriteCount(favoriteCount: Array<number>) {
    this._favoriteCount = favoriteCount;
  }
}
