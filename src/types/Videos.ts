import { format } from "date-fns";

export class Videos {
  constructor(
    //動画ID
    private _id: number,
    //動画投稿日
    private _publishedAt: string,
    //動画タイトル
    private _title: string,
    //概要欄
    private _description: string,
    //サムネイル
    private _thumbnailsUrl: string,
    //チャンネル名
    private _channelTitle: string,
    //タグ
    private _tags: string
  ) {}

  get formatPublishedAt(): string {
    const publishedAt = format(
      new Date(this._publishedAt),
      "yyyy年MM月dd日hh時mm分ss秒"
    );
    return publishedAt;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get publishedAt(): string {
    return this._publishedAt;
  }

  public set publishedAt(publishedAt: string) {
    this._publishedAt = publishedAt;
  }

  public get title(): string {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }

  public get description(): string {
    return this._description;
  }

  public set description(description: string) {
    this._description = description;
  }

  public get thumbnailsUrl(): string {
    return this._thumbnailsUrl;
  }

  public set thumbnailsUrl(thumbnailsUrl: string) {
    this._thumbnailsUrl = thumbnailsUrl;
  }

  public get channelTitle(): string {
    return this._channelTitle;
  }

  public set channelTitle(channelTitle: string) {
    this._channelTitle = channelTitle;
  }

  public get tags(): string {
    return this._tags;
  }

  public set tags(tags: string) {
    this._tags = tags;
  }
}
