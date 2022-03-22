import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { Account } from "@/types/Account";
import { Videos } from "@/types/Videos";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accountList: Array<Account>(),
    loginAccount: Account,
    soaringVideos: Array<Videos>(),
  },
  actions: {
    async getSoaringVideos(context) {
      const responce = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=JP&key=AIzaSyChyFfGpQSYRhWTBuyeXTflkqTd4Sgc1HU"
      );
      console.dir("responce:" + JSON.stringify(responce));
      const payload = responce.data.items;
      console.log(payload);
      context.commit("showSoaringVideos", payload);
    },
  },
  mutations: {
    showSoaringVideos(state, payload) {
      state.soaringVideos = new Array<Videos>();
      for (const soaringVideo of payload) {
        state.soaringVideos.push(
          new Videos(
            soaringVideo.id,
            soaringVideo.snippet.publishedAt,
            soaringVideo.snippet.title,
            soaringVideo.snippet.description,
            soaringVideo.snippetthumbnailsUrl,
            soaringVideo.snippet.channelTitle,
            soaringVideo.snippet.tags
          )
        );
      }
      console.log(state.soaringVideos);
    },
  },
  modules: {},
  getters: {
    getSoaringVideosInfo(state) {
      return state.soaringVideos;
    },
    getAccountList(state) {
      return state.accountList;
    },
    getAccountById(state) {
      return (id: number) => {
        return state.accountList.filter((account) => {
          account.id === id;
        })[0];
      };
    },
  },
});
