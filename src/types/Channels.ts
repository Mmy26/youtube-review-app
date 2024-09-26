import { format } from "date-fns";

export class Channels {
  constructor(
    //チャンネルID
    private _id: string,
    //チャンネル名
    private _title: string,
    //チャンネル説明
    private _description: string,
    //設立日
    private _publishedAt: string,
    //チャンネルアイコン
    private _thumbnailsUrl: string,
    //総再生回数
    private _viewCount: number,
    //チャンネル登録者数
    private _subscriberCount: number,
    //総動画数
    private _videoCount: number
  ) {}

  get formatPublishedAt(): string {
    return format(new Date(this._publishedAt), "yyyy年MM月dd日hh時mm分");
  }
  get formatViewCount(): string {
    return Number(this._viewCount).toLocaleString();
  }
  get formatSubscriberCount(): string {
    return Number(this._subscriberCount).toLocaleString();
  }
  get formatVideoCount(): string {
    return Number(this._videoCount).toLocaleString();
  }

  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
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

  public get publishedAt(): string {
    return this._publishedAt;
  }

  public set publishedAt(publishedAt: string) {
    this._publishedAt = publishedAt;
  }

  public get thumbnailsUrl(): string {
    return this._thumbnailsUrl;
  }

  public set thumbnailsUrl(thumbnailsUrl: string) {
    this._thumbnailsUrl = thumbnailsUrl;
  }

  public get viewCount(): number {
    return this._viewCount;
  }

  public set viewCount(viewCount: number) {
    this._viewCount = viewCount;
  }

  public get subscriberCount(): number {
    return this._subscriberCount;
  }

  public set subscriberCount(subscriberCount: number) {
    this._subscriberCount = subscriberCount;
  }

  public get videoCount(): number {
    return this._videoCount;
  }

  public set videoCount(videoCount: number) {
    this._videoCount = videoCount;
  }
}
