import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";
import { Account } from "@/types/Account";
import { Videos } from "@/types/Videos";
import { Channels } from "@/types/Channels";
import { Review } from "@/types/Review";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //最後のレビューID
    lastReviewId: 1,
    // 登録された最後のユーザーID
    lastUserId: 0,
    // Youtuber情報
    youtubersInfo: Array<Channels>(),
    // ユーザー情報
    accountList: Array<Account>(),
    soaringVideos: Array<Videos>(),
    currentUser: new Account(
      0,
      "",
      "",
      "",
      "",
      "",
      "",
      new Array<Channels>(),
      new Array<Review>()
    ),

    apiKey: Array<string>(
      "AIzaSyApkzQo4zN3y4hUm6kYHAIyQQ_fQBVXS3U",
      "AIzaSyD0gPqZj2y8L2QVei5d4NUMsthKN3ltr1c",
      "AIzaSyAzfoPPbpueXEcQypbLRLXXNCz5JQFDtlc",
      "AIzaSyDH4tzh3tFM5Ok8Q5jSpPHxpcQZMnK4U9M",
      "AIzaSyBOMUoWdabc9lzK4XQFop3x0dYtUeI6agU",
      "AIzaSyAgRYbghnEpgHX9f980fKCzlTP6vESPkwo",
      "AIzaSyByE-aaIhWOBWxX0MdlUN6szX6qMe7kX5s",
      "AIzaSyAjmyhCg__LtgHseTa_w2NzZGdD_YLoVZY",
      "AIzaSyDgB9MCfZvVqjzt_psZxNqxmdv06AJXDNg",
      "AIzaSyD1hsARhNyLS07rUwz6fqrVp2pWnGvkWTQ",
      "AIzaSyChyFfGpQSYRhWTBuyeXTflkqTd4Sgc1HU",
      "AIzaSyBaI5sqV11bUD-EzLC_lRmHBQztOctDwOc"
    ),
  },
  actions: {
    /**
     * 急上昇動画をWebAPIから取得してmutationを呼び出す.
     * @param context コンテキスト
     */
    async getSoaringVideos(context) {
      const key = context.getters.getApiKey;
      let responce: any = "";
      do {
        responce = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=JP&maxResults=10&key=${key}`
        );
      } while (responce.data.error);
      const payload = responce.data.items;
      const youtuberArray = [];
      let responce2: any = "";
      for (let i = 0; i <= 9; i++) {
        do {
          responce2 = await axios.get(
            `https://www.googleapis.com/youtube/v3/channels?key=${key}&part=snippet,contentDetails,statistics,status&id=${payload[i].snippet.channelId}`
          );
        } while (responce2.data.error);
        youtuberArray.push(responce2.data.items[0]);
      }
      const payload2 = youtuberArray;
      context.commit("showSoaringVideos", payload);
      context.commit("showYoutubersInfo", payload2);
    },
  },
  mutations: {
    /**
     * 急上昇動画を表示する.
     * @param state - ステート
     * @param payload - ペイロード
     */
    addUser(state, payload) {
      state.accountList.push(payload);
    },
    /**
     * カレントユーザーにからのアカウントオブジェクトを代入し、ログアウトする.
     * @param state - ステート
     */
    removeUser(state) {
      state.currentUser = new Account(
        0,
        "",
        "",
        "",
        "",
        "",
        "",
        new Array<Channels>(),
        new Array<Review>()
      );
    },
    /**
     * stateのユーザーリスト中のレビュー情報にいいねカウントを入れる.
     * @param state - ステート
     * @param payload - ペイロード
     */
    addFavoriteCount(state, payload) {
      for (const account of state.accountList) {
        for (let review of account.reviewList) {
          if (payload.reviewId === review.reviewId) {
            review = payload;
          }
        }
      }
    },
    /**
     * ユーザー登録時のIDの更新.
     * @param state - ステート
     * @param payload - ペイロード
     */
    addLastUserId(state, payload) {
      state.lastUserId = payload;
    },
    addChannelData(state, payload) {
      for (const account of state.accountList) {
        if (account.id === state.currentUser.id) {
          account.favoriteChannelList.push(payload);
        }
      }
    },
    addFavorite(state, payload) {
      for (const account of state.accountList) {
        for (const review of account.reviewList) {
          if (payload.reviewId === review.reviewId) {
            review.favoriteCount.push(payload.favoriteCount);
          }
        }
      }
    },
    showSoaringVideos(state, payload) {
      state.soaringVideos = new Array<Videos>();
      for (const soaringVideo of payload) {
        state.soaringVideos.push(
          new Videos(
            soaringVideo.id,
            soaringVideo.snippet.publishedAt,
            soaringVideo.snippet.title,
            soaringVideo.snippet.description,
            soaringVideo.snippet.thumbnails.high.url,
            soaringVideo.snippet.channelTitle,
            soaringVideo.snippet.tags,
            soaringVideo.statistics.viewCount
          )
        );
      }
    },
    showYoutubersInfo(state, payload) {
      state.youtubersInfo = new Array<Channels>();
      for (const youtuberInfo of payload) {
        state.youtubersInfo.push(
          new Channels(
            youtuberInfo.id,
            youtuberInfo.snippet.title,
            youtuberInfo.snippet.description,
            youtuberInfo.snippet.publishedAt,
            youtuberInfo.snippet.thumbnails.high.url,
            youtuberInfo.statistics.viewCount,
            youtuberInfo.statistics.subscriberCount,
            youtuberInfo.statistics.videoCount
          )
        );
      }
    },

    /**
     * ログインしたユーザー情報をstateに保存する.
     *
     * @param state - ステート
     * @param payload - ペイロード
     */
    addCurrentUser(state, payload) {
      state.currentUser = payload;
    },
    changeAccountIcon(state, payload) {
      const account = state.accountList.find(
        (account) => account.id === payload.id
      );
      for (let i = 0; i < state.accountList.length; i++) {
        if (state.accountList[i].id === payload.id) {
          state.accountList.splice(i, 1);
        }
      }
      if (account !== undefined) {
        account.img = payload.img;
        state.accountList.push(account);
      }
    },

    changeSelfIntroduction(state, payload) {
      const account = state.accountList.find(
        (account) => account.id === payload.id
      );
      for (let i = 0; i < state.accountList.length; i++) {
        if (state.accountList[i].id === payload.id) {
          state.accountList.splice(i, 1);
        }
      }
      if (account !== undefined) {
        account.name = payload.name;
        account.introduction = payload.introduction;
        state.accountList.push(account);
      }
    },

    sortByReviewCount(state) {
      state.accountList.sort(function (before: Account, after: Account) {
        //ある順序の基準において a が b より小
        if (after.reviewList.length < before.reviewList.length) {
          return -1;
        }
        //その順序の基準において a が b より大
        if (after.reviewList.length > before.reviewList.length) {
          return 1;
        }
        // a と b が等しい場合
        return 0;
      });
    },
    postReview(state, payload) {
      const account = state.accountList.find(
        (account) => account.id === state.currentUser.id
      );
      for (let i = 0; i < state.accountList.length; i++) {
        if (state.accountList[i].id === state.currentUser.id) {
          state.accountList.splice(i, 1);
        }
      }
      if (account !== undefined) {
        account.reviewList.push(
          new Review(
            payload.date,
            state.lastReviewId,
            account.id,
            account.name,
            account.img,
            payload.video,
            payload.evaluation,
            payload.review,
            new Array<number>()
          )
        );
        state.lastReviewId++;
        console.log(account);

        state.accountList.push(account);
        console.log("sss");
      }
    },
  },
  modules: {},
  getters: {
    /**
     * 急上昇動画を返す.
     * @param state - ステート
     * @returns 急上昇動画
     */
    getSoaringVideosInfo(state) {
      return state.soaringVideos;
    },
    /**
     * 急上昇動画の50位までのチャンネル情報を返す.
     * @param state - ステート
     * @returns 急上昇動画の50位までのチャンネル情報
     */
    getYoutubersInfo(state) {
      return state.youtubersInfo;
    },
    /**
     * 全てのアカウント情報を返す.
     * @param state - ステート
     * @returns - 全てのアカウント情報
     */
    getAccountList(state) {
      return state.accountList;
    },
    getCurrentUser(state) {
      return state.currentUser;
    },
    getReviewCounts(state) {
      let reviewCounts = 0;
      for (let i = 0; i < state.accountList.length; i++) {
        reviewCounts += state.accountList[i].reviewList.length;
      }
      return reviewCounts;
    },
    getAccountById(state) {
      return (id: number) => {
        return state.accountList.filter((account) => account.id === id)[0];
      };
    },

    getMyAccountFlag(state) {
      return (account: Account) => {
        return state.currentUser.id === account.id;
      };
    },
    getReviewListByVideoId(state) {
      return (video: Videos) => {
        const reviewListByVideoId = new Array<Review>();
        for (const account of state.accountList) {
          for (const review of account.reviewList) {
            if (review.videos.id === video.id) {
              reviewListByVideoId.push(review);
            }
          }
        }
        return reviewListByVideoId;
      };
    },
    /**
     * APIキーをランダムに取得.
     * @param state - ステート
     * @returns APIキー
     */
    getApiKey(state) {
      return state.apiKey[Math.floor(Math.random() * state.apiKey.length)];
    },
    /**
     * 登録された最後のユーザーに使用されるIDを取得.
     *
     * @param state -ステート
     * @returns 登録された最後のユーザーに使用されるID
     */
    getLastUserId(state) {
      return state.lastUserId;
    },
  },
});
