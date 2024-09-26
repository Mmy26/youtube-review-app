<template>
  <div>
    <div class="introduction">
      <div>
        <!-- <router-link
          :to="'/iconChange/' + currentAccount.id"
          v-if="myAccountFlag"
        > -->
        <div class="icon">
          <img class="circle responsive-img image2" :src="currentAccount.img" />
        </div>
        <!-- </router-link> -->
      </div>
      <div class="introduction2">
        <div class="subtitle name">
          {{ currentAccount.name }}
        </div>
        <div class="introduction3">
          {{ currentAccount.introduction }}
        </div>
      </div>
      <div v-if="myAccountFlag" class="selfIntroductionChange">
        <button class="btn icon3" @click="selfIntroductionChange()">
          <i class="material-icons prefix">build</i>
          編集
        </button>
      </div>
    </div>
    <hr />
    <h4 class="subtitle">お気に入りのCHANNEL</h4>
    <div class="channelList">
      <div
        v-for="favoriteChannel of currentAccount.favoriteChannelList"
        :key="favoriteChannel.id"
      >
        <router-link :to="'/channelDetail/' + favoriteChannel.id">
          <div class="icon2">
            <img
              class="circle responsive-img image2 channel image5"
              :src="favoriteChannel.thumbnailsUrl"
            />
          </div>
        </router-link>
        <div class="channelTitle">{{ favoriteChannel.title }}</div>
      </div>
    </div>
    <hr />
    <div class="reviewList">
      <div
        v-for="review of currentAccount.reviewList"
        :key="review.id"
        class="reviewCard"
      >
        <router-link :to="'/showReview/' + review.reviewId">
          <div class="review z-depth-5">
            <div class="reviewText">
              <div class="subtitle">
                {{ review.videos.title }}
              </div>
              <div class="evaluation">
                評価：
                <span
                  class="star5_rating"
                  :data-rate="review.evaluation"
                ></span>
              </div>
              <div class="reviewText2">
                【{{ review.videos.channelTitle }}】
              </div>
              <hr />
              <div>
                {{ review.review }}
              </div>
            </div>
            <img class="image" :src="review.videos.thumbnailsUrl" />
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Account } from "@/types/Account";
import { Channels } from "@/types/Channels";
import { Review } from "@/types/Review";
import { Videos } from "@/types/Videos";
@Component
export default class XXXComponent extends Vue {
  private currentAccount = new Account(
    1,
    "aaa",
    "wwwwww",
    "",
    "aaa.com",
    "09011112222",
    "pass",
    [new Channels("id", "ddd", "ddd", "sss", "/img/pagu.jpg", 1, 1, 1)],
    [
      new Review(
        "",
        1,
        1,
        "",
        "",
        new Videos(1, "ss", "ss", "ss", "/img/pagu.jpg", "ss", "ss", "ss"),
        1,
        "レビューのプレビュー",
        new Array<number>()
      ),
      new Review(
        "",
        1,
        1,
        "",
        "",
        new Videos(1, "ss", "ss", "ss", "/img/pagu.jpg", "ss", "ss", "ss"),
        1,
        "レビューのプレビュー",
        new Array<number>()
      ),
      new Review(
        "",
        1,
        1,

        "",
        "",
        new Videos(1, "ss", "ss", "ss", "/img/pagu.jpg", "ss", "ss", "ss"),
        1,
        "レビューのプレビュー",
        new Array<number>()
      ),
      new Review(
        "",
        1,
        1,
        "",
        "",
        new Videos(1, "ss", "ss", "ss", "/img/pagu.jpg", "ss", "ss", ""),
        1,
        "レビューのプレビュー",
        new Array<number>()
      ),
    ]
  );
  private myAccountFlag = false;

  created(): void {
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

    console.log(this.$route.params.id);
    const accountId = Number(this.$route.params.id);
    const account = this.$store.getters.getAccountById(accountId);
    this.currentAccount = new Account(
      account.id,
      account.name,
      account.introduction,
      account.img,
      account.mailaddless,
      account.telephone,
      account.password,
      account.favoriteChannelList,
      account.reviewList
    );

    this.myAccountFlag = this.$store.getters.getMyAccountFlag(account);
  }

  selfIntroductionChange(): void {
    this.$router.push(`/selfIntroductionChange/${this.currentAccount.id}`);
  }
}
</script>

<style scoped>
.image {
  width: 20vw;
  /* height: 20hw; */
  object-fit: cover;
}
.name {
  font-size: 25px;
}
.icon {
  width: 100px;
  height: 100px;
}

.icon2 {
  width: 150px;
  height: 150px;
  margin-right: 30px;
}

.icon3 {
  width: 82px;
  height: 30px;
  display: flex;
  justify-content: center;
}

.icon4 {
  width: 280px;
  height: 200px;
}

.image2 {
  width: 100%;
  height: 100%;
  margin: auto;
  object-fit: cover;
}

.image5:hover {
  opacity: 0.6;
}

.image3 {
  width: 10vw;
  object-fit: cover;
}

.introduction {
  display: flex;
  justify-content: left;
  width: 60%;
  margin: 0 auto;
}

.introduction2 {
  width: 600px;
  text-align: left;
  margin-left: 20px;
  margin-right: 20px;
}

.subtitle {
  margin-top: 8px;
  /* margin-bottom: 2px; */
  font-weight: bold;
}

.channelList {
  display: flex;
  justify-content: center;
}

.channel {
  margin-left: 30px;
}

.selfIntroductionChange {
  margin-top: 68px;
  /* margin-left: 600px; */
}

.reviewList {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  width: 90%;
  margin: 0 auto 20px auto;
}
.review {
  display: flex;
  justify-content: center;
  margin-left: 30px;
  margin-top: 30px;
  width: 550px;
  height: 200px;
}

.reviewText {
  width: 350px;
}

.star5_rating {
  position: relative;
  z-index: 0;
  display: inline-block;
  white-space: nowrap;
  color: #cccccc; /* グレーカラー 自由に設定化 */
  /*font-size: 30px; フォントサイズ 自由に設定化 */
}

.star5_rating:before,
.star5_rating:after {
  content: "★★★★★";
}

.star5_rating:after {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  overflow: hidden;
  white-space: nowrap;
  color: #ffcf32; /* イエローカラー 自由に設定化 */
}

.star5_rating[data-rate="5"]:after {
  width: 100%;
} /* 星5 */

.star5_rating[data-rate="4"]:after {
  width: 80%;
} /* 星4 */

.star5_rating[data-rate="3"]:after {
  width: 60%;
} /* 星3 */

.star5_rating[data-rate="2"]:after {
  width: 40%;
} /* 星2 */

.star5_rating[data-rate="1"]:after {
  width: 20%;
} /* 星1 */

.star5_rating[data-rate="0"]:after {
  width: 0%;
} /* 星0 */

.reviewText {
  overflow-wrap: break-word;
  overflow: hidden;
}

.reviewCard:hover {
  opacity: 0.6;
}

.channelTitle {
  width: 150px;
  height: 50px;
  margin-left: 30px;
  overflow-wrap: break-word;
  overflow: hidden;
}

.introduction3 {
  overflow-wrap: break-word;
}
</style>
