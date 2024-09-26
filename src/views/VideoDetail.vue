<template>
  <div class="container context">
    <div class="video item col card white">
      <div class="frame">
        <iframe
          width="560"
          height="315"
          :src="'https://www.youtube.com/embed/' + videoDetail.id"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div>{{ videoDetail.title }}</div>
      <div>動画投稿日：{{ videoDetail.formatPublishedAt }}</div>
      <div>再生回数：{{ videoDetail.formatViewCount }}回</div>
      <br />
      <router-link :to="'/channelDetail/' + channelDetail.id">
        <img :src="channelDetail.thumbnailsUrl" />
      </router-link>
      <div>【{{ videoDetail.channelTitle }}】</div>
      <div>チャンネル設立日：{{ channelDetail.formatPublishedAt }}</div>
      <button
        class="btn"
        type="button"
        v-on:click="showDescription"
        v-if="!flag"
      >
        概要欄をcheck！
      </button>
      <button
        class="btn"
        type="button"
        v-on:click="hiddenDescription"
        v-if="flag"
      >
        概要欄を閉じる
      </button>
      <hr />
      <div v-if="flag">
        <h7>【概要欄】</h7>
      </div>
      <div v-if="flag" class="description">
        {{ channelDetail.description }}
      </div>
      <hr v-if="flag" />
      <div>総再生回数：{{ channelDetail.formatViewCount }}回</div>
      <div>チャンネル登録者数：{{ channelDetail.formatSubscriberCount }}人</div>
      <div>総動画数：{{ channelDetail.formatVideoCount }}個</div>
    </div>

    <div class="review">
      <div>
        <button class="btn" @click="postReview">レビューを投稿する</button>
      </div>
      <div class="reviewList300">
        <div class="row" v-for="review of reviewList" :key="review.id">
          <router-link :to="'/showReview/' + review.reviewId">
            <div class="col s10 offset-s1">
              <div class="card content">
                <div class="card-image">
                  <img class="accountImage" :src="review.accountIcon" />
                </div>
                <div class="card-content content">
                  <div class="card-name">{{ review.accountName }}</div>
                  <div class="card-evaluation evaluation">
                    評価：
                    <span
                      class="star5_rating"
                      :data-rate="review.evaluation"
                    ></span>
                  </div>
                  <div>
                    <hr />
                  </div>
                  <p class="reviewDetail">
                    {{ review.review }}
                  </p>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AddReview from "@/components/AddReview.vue";
import axios from "axios";
import { Videos } from "@/types/Videos";
import { Channels } from "@/types/Channels";
import { Review } from "@/types/Review";

@Component({
  components: { AddReview },
})
export default class XXXComponent extends Vue {
  // 動画詳細
  private videoDetail = new Videos(0, "", "", "", "", "", "", "");
  // チャンネル詳細
  private channelDetail = new Channels("", "", "", "", "", 0, 0, 0);
  private reviewList = new Array<Review>();
  private flag = false;

  async created(): Promise<void> {
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

    const videoId = this.$route.params.id;
    const key = this.$store.getters.getApiKey;
    let responce: any = "";
    do {
      responce = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=${key}&id=${videoId}`
      );
    } while (responce.data.error);
    const responceVideo = responce.data.items[0];
    this.videoDetail = new Videos(
      responceVideo.id,
      responceVideo.snippet.publishedAt,
      responceVideo.snippet.title,
      responceVideo.snippet.description,
      responceVideo.snippet.thumbnails.high.url,
      responceVideo.snippet.channelTitle,
      responceVideo.tags,
      responceVideo.statistics.viewCount
    );
    const responce2 = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?key=${key}&part=snippet,contentDetails,statistics,status&id=${responceVideo.snippet.channelId}`
    );
    const responceChannel = responce2.data.items[0];
    this.channelDetail = new Channels(
      responceChannel.id,
      responceChannel.snippet.title,
      responceChannel.snippet.description,
      responceChannel.snippet.publishedAt,
      responceChannel.snippet.thumbnails.high.url,
      responceChannel.statistics.viewCount,
      responceChannel.statistics.subscriberCount,
      responceChannel.statistics.videoCount
    );
    this.reviewList = this.$store.getters.getReviewListByVideoId(
      this.videoDetail
    );
  } //end created

  showDescription(): void {
    this.flag = true;
  }
  hiddenDescription(): void {
    this.flag = false;
  }

  postReview(): void {
    const user = this.$store.getters.getCurrentUser;

    if (user.id === 0) {
      this.$router.push("/login");
      return;
    }
    this.$router.push(`/addReview/${this.videoDetail.id}`);
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
}

img {
  width: 200px;
  height: 150px;
  object-fit: cover;
}
.content {
  display: flex;
}
.card-content {
  flex-direction: column;
  width: 300px;
  height: 150px;
  padding: 0;
}

.video {
  width: 500px;
  /* height: 850px; */
  object-fit: cover;
}

.review {
  width: 550px;
}

iframe {
  width: 100%;
  height: 100%;
  margin: auto;
  object-fit: cover;
}

.frame {
  width: 400px;
  height: 225px;
  margin: 8px 0 0 8px;
}

.description {
  overflow-y: scroll;
  height: 153px;
}

.row {
  width: 480px;
  margin: 0;
}

.card-image {
  width: 150px;
  height: 150px;
}

.card-name {
  text-align: left;
  padding: 5px 0 0 10px;
}

.card-evaluation {
  text-align: left;
  padding: 5px 0 0 10px;
}

.reviewDetail {
  overflow: hidden;
}

.reviewList300 {
  height: 520px;
  width: 550px;
  margin-left: 50px;
  overflow-y: scroll;
  padding: 0;
}

.accountImage {
  width: 100%;
  height: 100%;
  margin: auto;
  object-fit: cover;
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
</style>
