<template>
  <div class="container">
    <div class="youtuber item col card white">
      <div>
        <img class="img1" :src="currentChannel.thumbnailsUrl" />
      </div>
      <div class="channel-title">{{ currentChannel.title }}</div>
      <button
        class="btn"
        type="button"
        v-on:click="showDescription"
        key="show"
        v-if="!flag"
      >
        概要欄をcheck！
      </button>
      <button
        class="btn hidden"
        type="button"
        v-on:click="hiddenDescription"
        key="hidden"
        v-if="flag"
      >
        概要欄を閉じる
      </button>
      <div v-if="flag">
        <h7>【概要欄】</h7>
        <hr />
      </div>
      <div class="channel-description" v-if="flag">
        {{ currentChannel.description }}
      </div>
      <hr />
      <div class="counts">
        <div>総再生回数：{{ currentChannel.formatViewCount }}回</div>
        <div>
          チャンネル登録者数：{{ currentChannel.formatSubscriberCount }}人
        </div>
      </div>
      <a
        class="waves-effect waves-light btn favorite favoriteBtn"
        v-on:click="favoriteChannel()"
        :disabled="favoriteFlag"
        ><i class="material-icons left">star_border</i>お気に入り</a
      >
    </div>

    <div class="videos item col card white video-card">
      <div v-for="videoDetail of videoArr" :key="videoDetail.id">
        <router-link :to="'/videoDetail/' + videoDetail.id"
          ><img class="img2" :src="videoDetail.thumbnailsUrl"
        /></router-link>
        <div class="video-title">
          {{ videoDetail.title }}
        </div>
        <!-- <span>{{ videoDetail.tags }}</span
        ><br /> -->
        <span>投稿日：{{ videoDetail.formatPublishedAt }}</span
        ><br />
        <span>{{ videoDetail.description }}</span>
        <hr />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Channels } from "@/types/Channels";
import { Videos } from "@/types/Videos";
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  private currentChannel = new Channels("", "", "", "", "", 1, 1, 1);
  private videoArr = new Array<Videos>();

  private flag = false;
  // チャンネルお気に入りボタンのフラグ
  private favoriteFlag = false;
  // ログイン中のユーザーのID
  private currentUserId = this.$store.getters.getCurrentUser.id;
  // APIキー
  private apiKey = this.$store.getters.getApiKey;

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

    // ログインしていない場合を押せなくする
    if (this.currentUserId === 0) {
      this.favoriteFlag = true;
    }

    const channelId = this.$route.params.id;
    const response: any = "";
    do {
      await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&key=${this.apiKey}&part=snippet,contentDetails,statistics,status`
      );
    } while (response.data.error);
    const items = response.data.items[0];
    this.currentChannel = new Channels(
      items.id,
      items.snippet.title,
      items.snippet.description,
      items.snippet.publishedAt,
      items.snippet.thumbnails.high.url,
      items.statistics.viewCount,
      items.statistics.subscriberCount,
      items.statistics.videoCount
    );
    let responseVideo: any = "";
    do {
      responseVideo = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=video&channelId=${this.currentChannel.id}&maxResults=10&regionCode=JP&key=${this.apiKey}&order=date`
      );
    } while (response.data.error);
    const videoItems = responseVideo.data.items;
    for (const videoitem of videoItems) {
      let responceVideoDetail: any = "";
      do {
        responceVideoDetail = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoitem.id.videoId}&part=snippet,statistics&regionCode=JP&key=${this.apiKey}`
        );
      } while (response.data.error);
      const videoDetailItems = responceVideoDetail.data.items[0];
      this.videoArr.push(
        new Videos(
          videoDetailItems.id,
          videoDetailItems.snippet.publishedAt,
          videoDetailItems.snippet.title,
          videoDetailItems.snippet.description,
          videoDetailItems.snippet.thumbnails.high.url,
          videoDetailItems.snippet.channelTitle,
          videoDetailItems.snippet.tags,
          videoDetailItems.statistics.videoCount
        )
      );
    }
    // 概要欄がない場合の処理
    if (this.currentChannel.description === "") {
      this.currentChannel.description =
        "このYoutuberの概要欄は見つかりませんでした";
    }

    // 既にお気に入り登録している場合を押せなくする
    for (const account of this.$store.getters.getAccountList) {
      if (this.currentUserId === account.id) {
        for (const favoriteChannel of account.favoriteChannelList) {
          if (channelId === favoriteChannel.id) {
            this.favoriteFlag = true;
          }
        }
      }
    }
  }
  /**
   * 概要欄を表示する.
   */
  showDescription(): void {
    this.flag = true;
  }
  hiddenDescription(): void {
    this.flag = false;
  }
  /**
   * チャンネル情報をfavoriteListに入れる.
   */
  favoriteChannel(): void {
    this.$store.commit("addChannelData", this.currentChannel);
    this.favoriteFlag = true;
  }
}
</script>

<style scoped>
.container {
  display: flex;
}
.img1 {
  width: 350px;
  height: 350px;
  /* height: auto; */
  /* object-fit: cover; */
}

.channel-title {
  font-weight: bold;
  font-size: 30px;
}
.youtuber {
  /* overflow-wrap: break-word; */
  margin-top: 0;
  margin-right: 30px;
  margin-bottom: 20px;
  width: 550px;
  padding: 10px;
  padding-bottom: 0;
  object-fit: cover;
}
.video-title {
  font-weight: bold;
}
.video-card {
  margin-top: 0;
  overflow-x: auto;
  overflow-wrap: break-word;
}
.hidden {
  margin-bottom: 10px;
}
.img2 {
  width: 100%;
  height: 320px;
  object-fit: cover;
}
.img2:hover {
  opacity: 0.7;
  transition-duration: 0.3s;
}
.videos {
  overflow-x: auto;
  height: 552px;
  margin-top: 30px;
}
.favoriteBtn {
  margin-bottom: 20px;
}
.channel-description {
  margin-top: 5px;
  height: 224px;
  overflow-x: auto;
}
.counts {
  margin-top: 20px;
}
.favorite {
  margin-top: 5px;
}
</style>
