<template>
  <div>
    <div>
      評価：
      <label for="1">
        <input
          type="radio"
          name="hyouka"
          id="1"
          v-model="evaluation"
          value="1"
        />
        <span> 1</span>
      </label>
      <label for="2">
        <input
          type="radio"
          name="hyouka"
          id="2"
          v-model="evaluation"
          value="2"
        />
        <span> 2</span>
      </label>
      <label for="3">
        <input
          type="radio"
          name="hyouka"
          id="3"
          v-model="evaluation"
          value="3"
        />
        <span> 3</span>
      </label>
      <label for="4">
        <input
          type="radio"
          name="hyouka"
          id="4"
          v-model="evaluation"
          value="4"
        />
        <span> 4</span>
      </label>
      <label for="5">
        <input
          type="radio"
          name="hyouka"
          id="5"
          v-model="evaluation"
          value="5"
        />
        <span> 5</span>
      </label>
    </div>
    <div>
      <textarea name="" id="" cols="30" rows="10" v-model="review"></textarea>
    </div>
    <div>
      <button @click="postReview()">レビューを投稿</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { format } from "date-fns";
import { Videos } from "@/types/Videos";
import axios from "axios";
@Component
export default class XXXComponent extends Vue {
  private evaluation = 0;
  private review = "";
  private videoDetail = new Videos(0, "", "", "", "", "", "", "");

  async created(): Promise<void> {
    const videoId = this.$route.params.id;
    const key = this.$store.getters.getApiKey;
    const responce = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=${key}&id=${videoId}`
    );
    const responceVideo = responce.data.items[0];
    this.videoDetail = new Videos(
      responceVideo.id,
      responceVideo.snippet.publishedAt,
      responceVideo.snippet.title,
      responceVideo.snippet.description,
      responceVideo.snippet.thumbnails.medium.url,
      responceVideo.snippet.channelTitle,
      responceVideo.tags,
      responceVideo.statistics.viewCount
    );
    console.log(this.videoDetail);
  }

  getDate(): string {
    const nowDate = format(new Date(), "yyyy年MM月dd日");
    return nowDate;
  }

  postReview(): void {
    this.$store.commit("postReview", {
      date: this.getDate(),
      evaluation: this.evaluation,
      review: this.review,
      video: this.videoDetail,
    });
    this.$router.push(`/videoDetail/${this.videoDetail.id}`);
  }
}
</script>

<style scoped></style>
