<template>
  <div class="contain">
    <div v-if="flag">
      <img
        class="gif"
        src="/img/18905401_MotionElements_transition-10_converted_481357-640x360-3s-q2.gif"
      />
    </div>

    <div v-if="!flag">
      <div class="top">
        <img class="top-image" src="/img/topImage.gif" />
        <div class="count">
          <img class="number-box" src="/img/numberBox.png" />
        </div>
        <span class="review-counts"
          >{{ reviewCounts.toLocaleString()
          }}<span class="span1"
            >&nbsp;件レビューが投稿されています！</span
          ></span
        >
        <div class="register-user">
          <p class="p1">会員登録はこちらから！</p>
          <button class="button1" type="button" v-on:click="moveToRegister">
            <span>
              <i class="small material-icons">ondemand_video</i>
              今すぐ登録する&nbsp;&nbsp;&nbsp;&nbsp;>></span
            >
          </button>
          <p class="p2">外部サービスで登録する</p>
          <button class="button2 btn" type="button">
            <img class="button-icon" src="/img/google.png" /><span
              >&nbsp;Googleで登録</span
            >
          </button>
          <button class="button3 btn" type="button">
            <img class="button-icon" src="/img/f_logo_RGB-White_58.png" /><span
              >&nbsp;Facebookで登録</span
            >
          </button>
          <button class="button4 btn" type="button">
            <img
              class="button-icon"
              src="/img/2021 Twitter logo - white.png"
            /><span>&nbsp;Twitterで登録</span>
          </button>
        </div>
      </div>

      <h4 class="subtitle">急上昇動画</h4>
      <div class="sample">
        <div class="soaring-videos">
          <div v-for="video of top5Videos" :key="video.id">
            <iframe
              width="560"
              height="315"
              v-bind:src="'https://www.youtube.com/embed/' + video.id"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <router-link :to="'/videoDetail/' + video.id">
              <div class="video-title">{{ video.title }}</div>
            </router-link>
            <div class="channel-title1">{{ video.channelTitle }}</div>
            <div>投稿日：{{ video.formatPublishedAt }}</div>
          </div>
        </div>
      </div>

      <div class="background">
        <h4 class="subtitle">人気のアカウント</h4>
        <div class="item-area">
          <div
            class="item col card white popular-account"
            v-for="(account, index) of recommendationAccountList"
            :key="index"
          >
            <div class="account-top">
              <router-link :to="'/myProfile/' + account.id"
                ><img
                  class="account-img circle responsive-img"
                  :src="account.img"
              /></router-link>
              <div class="account-right">
                <div class="account-name">{{ account.name }}</div>
                <div>レビュー数：{{ account.reviewList.length }}件</div>
              </div>
            </div>
            <div class="account-bottom">
              <div
                v-for="(review, index) of videoThumnails[index]"
                :key="index"
              >
                <img class="review" :src="review.videos.thumbnailsUrl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <h4 class="subtitle">おすすめYoutuber</h4>
      <div class="item-area">
        <div
          class="popular-youtuber"
          v-for="(youtuber, index) of recommendationYoutuberList"
          :key="index"
        >
          <router-link :to="'/channelDetail/' + youtuber.id"
            ><div><img class="img_wrap" :src="youtuber.thumbnailsUrl" /></div
          ></router-link>
          <div class="channel-title2">{{ youtuber.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Videos } from "@/types/Videos";
import { Channels } from "@/types/Channels";
import { Account } from "@/types/Account";
import { Review } from "@/types/Review";

@Component
export default class XXXComponent extends Vue {
  // 急上昇動画50件分
  private soaringVideos: Array<Videos> = [];
  // 急上昇動画TOP5
  private top5Videos: Array<Videos> = [];
  // 急上昇動画50件分のチャンネル情報
  private youtubersInfo: Array<Channels> = [];
  // おすすめYoutuberの一覧
  private recommendationYoutuberList = Array<Channels>();
  // 人気アカウントの一覧
  private recommendationAccountList = Array<Account>();
  // フラッグ
  private flag = true;
  // 総レビュー数
  private reviewCounts = 0;
  // 動画のサムネイル
  private videoThumnails = Array<Array<Review>>();

  async created(): Promise<void> {
    /**
     * 総レビュー数を取得する.
     */
    this.reviewCounts = this.$store.getters.getReviewCounts;
    // スクロールトップボタン
    scrollTop(1); // 遅すぎるとガクガクになるので注意
    function scrollTop(duration: number) {
      let currentY = window.pageYOffset; // 現在のスクロール位置を取得
      let step = duration / currentY > 1 ? 10 : 100; // 三項演算子
      let timeStep = (duration / currentY) * step; // スクロール時間
      let intervalId = setInterval(scrollUp, timeStep);
      // timeStepの間隔でscrollUpを繰り返す。
      // clearItervalのために返り値intervalIdを定義する。

      function scrollUp() {
        currentY = window.pageYOffset;
        if (currentY === 0) {
          clearInterval(intervalId); // ページ最上部に来たら終了
        } else {
          scrollBy(0, -step); // step分上へスクロール
        }
      }
    }

    /**
     *Vuexストアのアクション経由非同期でWebAPIから急上昇動画Top5を取得する.
     *@returns Promiseオブジェクト
     */
    if (await this.$store.dispatch("getSoaringVideos")) {
      this.flag = true;
    } else {
      this.flag = false;
      this.soaringVideos = this.$store.getters.getSoaringVideosInfo;
      this.top5Videos.push(
        this.soaringVideos[0],
        this.soaringVideos[1],
        this.soaringVideos[2],
        this.soaringVideos[3],
        this.soaringVideos[4]
      );
      this.youtubersInfo = this.$store.getters.getYoutubersInfo;
      // おすすめYoutuberを５人ランダム表示させる
      for (let i = 1; this.recommendationYoutuberList.length < 5; i++) {
        let pushYoutuber =
          this.youtubersInfo[
            Math.floor(Math.random() * this.youtubersInfo.length)
          ];
        if (
          this.recommendationYoutuberList.find(
            (youtuber) => youtuber.id === pushYoutuber.id
          ) === undefined
        ) {
          this.recommendationYoutuberList.push(pushYoutuber);
        }
      }
    }
    // 人気アカウントとレビューした動画のサムネMAX3件表示
    this.$store.commit("sortByReviewCount");
    this.recommendationAccountList = this.$store.getters.getAccountList;
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (this.recommendationAccountList[i].reviewList[j] !== undefined) {
          if (this.videoThumnails[i] === undefined) {
            this.videoThumnails.push([
              this.recommendationAccountList[i].reviewList[j],
            ]);
          } else {
            this.videoThumnails[i].push(
              this.recommendationAccountList[i].reviewList[j]
            );
          }
        }
      }
    }
  }
  /**
   *ユーザー登録画面に遷移する.
   */
  moveToRegister(): void {
    this.$router.push("/registerUser");
  }
}
</script>

<style scoped>
@import "https://use.fontawesome.com/releases/v5.13.0/css/all.css";
/* TOP上部の画像に当てるCSS（テキスト、ボタン含む） */
.top {
  position: relative;
}
.top .p1 {
  position: absolute;
  top: 20%;
  left: 72%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin: 0;
  color: black;
  font-weight: bold;
  font-size: 25px;
}
/* button1 */
.top .button1 {
  position: absolute;
  top: 30%;
  left: 72%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding: 15px;
  width: 250px;
  height: 50px;
  box-sizing: border-box;
  background: #fff;
  border: none;
  margin-top: 5px;
}
.button1 span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background: #fff;
  box-sizing: border-box;
  color: #333;
  letter-spacing: 0.1em;
  text-decoration: none;
  box-shadow: 0px 5px 12px #cad4e2, -6px -6px 12px #fff;
  border-radius: 10px;
  position: absolute;
  top: -5px;
  left: 0;
  transition-duration: 0.2s;
  background-color: #fffaf0;
}
.button1:hover span {
  left: 0;
  top: 0;
  box-shadow: 0 0 4px #cad4e2, -2px -2px 4px #fff;
}
i {
  margin-right: 10px;
}
/* p2 */
.top .p2 {
  position: absolute;
  top: 40%;
  left: 72%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin-top: 5px;
  padding: 0;
  color: black; /*文字は白に*/
  font-weight: bold; /*太字に*/
  font-size: 20px;
}
/* button2~4 */
.top .button2 {
  position: absolute;
  top: 50%;
  left: 72%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: white;
}
.top .button3 {
  position: absolute;
  top: 60%;
  left: 72%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: rgb(60, 60, 148);
  border: none;
}
.top .button4 {
  position: absolute;
  top: 70%;
  left: 72%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: cornflowerblue;
  border: none;
}
.button2 span {
  color: black;
}
.button3 span,
.button4 span {
  color: white;
}
/* ボタンのicon,image */
.button-icon {
  width: 15px;
  height: 15px;
}
.top-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
}
/* レビューカウント数 */
.count {
  position: absolute;
  top: 68%;
  left: 24.5%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.number-box {
  width: 2vw;
  height: 5vh;
}
.review-counts {
  position: absolute;
  top: 63%;
  left: 24%;
  font-size: 35px;
}
.span1 {
  font-size: 17px;
}
/* リロード中のGIF */
.gif {
  width: 90%;
  height: 500px;
  object-fit: cover;
}
.contain {
  width: 100vw;
}
.sample {
  max-width: 100%;
}
/* 動画単体 */
iframe {
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
}
/* 急上昇動画 */
.channel-title1 {
  font-weight: bold;
  font-size: 20px;
}
.video-title {
  margin-top: 5px;
  font-size: 15px;
  font-weight: bold;
}
.soaring-videos {
  display: flex;
  overflow-x: auto;
}
.item-area {
  display: flex;
  justify-content: center;
}
/* 人気アカウント */
.popular-account {
  margin-right: 10px;
  margin-bottom: 30px;
  padding-left: 5px;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-right: 20px;
}
.account-top {
  display: flex;
}
.account-name {
  text-align: right;
  font-size: 20px;
  padding-top: 10px;
  font-weight: bold;
}
.account-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-right: 30px;
  margin-left: 10px;
  margin-bottom: 10px;
}
.account-bottom {
  display: flex;
  margin-left: 20px;
}
.review {
  width: 90px;
  height: 60px;
  margin-right: 5px;
  object-fit: cover;
}
/* サブタイトル */
.subtitle {
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
}
/* おすすめYoutuber*/
.popular-youtuber {
  margin-right: 10px;
}
.channel-title2 {
  font-weight: bold;
  margin-bottom: 10px;
}
.img_wrap {
  border: 1px solid #ddd;
  margin: 0 auto;
  width: 250px;
  height: 250px;
  cursor: pointer;
  transition-duration: 0.3s;
}
/* ホバー関連 */
.img_wrap:hover,
.video-title:hover,
.button2:hover,
.button3:hover,
.button4:hover,
.account-img:hover {
  opacity: 0.6;
  transition-duration: 0.3s;
}
/* 背景色 */
.background {
  background-color: #f2f2f2;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
