import { Channels } from "./Channels";
import { Review } from "./Review";

export class Account {
  constructor(
    //アカウントID
    private _id: number,
    //アカウント名
    private _name: string,
    //自己紹介文
    private _introduction: string,
    //アイコン
    private _img: string,
    //メールアドレス
    private _mailaddless: string,
    //電話番号
    private _telephone: string,
    //パスワード
    private _password: string,
    //お気に入りのチャンネル一覧
    private _favoriteChannelList: Array<Channels>,
    //レビュー一覧
    private _reviewList: Array<Review>
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get introduction(): string {
    return this._introduction;
  }

  public set introduction(introduction: string) {
    this._introduction = introduction;
  }

  public get img(): string {
    return this._img;
  }

  public set img(img: string) {
    this._img = img;
  }

  public get mailaddless(): string {
    return this._mailaddless;
  }

  public set mailaddless(mailaddless: string) {
    this._mailaddless = mailaddless;
  }

  public get telephone(): string {
    return this._telephone;
  }

  public set telephone(telephone: string) {
    this._telephone = telephone;
  }

  public get password(): string {
    return this._password;
  }

  public set password(password: string) {
    this._password = password;
  }

  public get favoriteChannelList(): Array<Channels> {
    return this._favoriteChannelList;
  }

  public set favoriteChannelList(favoriteChannelList: Array<Channels>) {
    this._favoriteChannelList = favoriteChannelList;
  }

  public get reviewList(): Array<Review> {
    return this._reviewList;
  }

  public set reviewList(reviewList: Array<Review>) {
    this._reviewList = reviewList;
  }
}
