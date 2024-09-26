<template>
  <div>
    <header class="no-padding">
      <div class="navbar-fixed">
        <nav class="navfeature grey darken-3">
          <div class="headerContainer nav-wrapper">
            <router-link to="/top">
              <span class="hide-on-small-only"
                ><img
                  src="/img/youtube.png"
                  width="30"
                  id="appicon"
                  style="
                    vertical-align: middle;
                    margin-bottom: 10px;
                    margin-right: 10px;
                  "
              /></span>
              <span
                id="header-large"
                style="font-weight: 300; font-size: 1.3rem"
                >Youtube Reviewer</span
              >
            </router-link>
            <div class="row text">
              <form class="col s12 searchForm">
                <div class="row">
                  <span class="input-field col s12">
                    <textarea
                      id="searchBox"
                      class="materialize-textarea"
                      value="searchText"
                      v-model="searchText"
                    ></textarea>
                  </span>
                </div>

                <button type="button" v-on:click="search(searchText)">
                  検索
                </button>
              </form>
            </div>
            <ul
              id="nav-mobile"
              class="hide-on-med-and-down right menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-5 current_page_item menu-item-24"
            >
              <!-- v-ifでログインの有無によるボタンの表示を分ける -->
              <li
                v-if="currentUserId === 0"
                id="menu-item-24"
                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-5 current_page_item menu-item-24"
              >
                <router-link to="/login" aria-current="page"
                  >ログイン</router-link
                >
              </li>
              <li
                id="menu-item-24"
                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-5 current_page_item menu-item-24"
              >
                <router-link
                  v-if="currentUserId !== 0"
                  to="/top"
                  aria-current="page"
                  v-on:click.native="removeUser()"
                  >ログアウト</router-link
                >
              </li>
              <li
                id="menu-item-24"
                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-5 current_page_item menu-item-24"
              >
                <router-link
                  v-if="currentUserId === 0"
                  to="/registerUser"
                  aria-current="page"
                  >会員登録</router-link
                >
              </li>
              <li
                id="menu-item-24"
                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-5 current_page_item menu-item-24"
              >
                <router-link
                  v-if="currentUserId !== 0"
                  :to="'/myProfile/' + currentUserId"
                  aria-current="page"
                  >マイページ</router-link
                >
              </li>
              <li class="icon">
                <img
                  v-if="currentUserId !== 0"
                  class="userIcon circle"
                  :src="accountImg"
                />
                <img
                  v-if="currentUserId === 0"
                  class="userIcon circle"
                  src="/img/blank.png"
                />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class XXXComponent extends Vue {
  // 検索ワード
  private searchText = "";
  // パス
  private path = "";

  private imgSource = "";
  /**
   * ログイン中のユーザーのID取得.
   * @returns - ログイン中のユーザーのID
   */
  get currentUserId(): number {
    const currentUser = this.$store.getters.getCurrentUser;
    return currentUser.id;
  }

  /**
   * ログイン中のユーザーのアイコン取得.
   * @returns - ログイン中のユーザーのアイコン
   */
  get accountImg(): string {
    const accountList = this.$store.getters.getAccountList;

    for (const account of accountList) {
      if (this.currentUserId === account.id) {
        this.imgSource = account.img;
      }
    }
    return this.imgSource;
  }
  /**
   * ワードを検索のメソッド.
   *
   * @param searchText - 検索ワード
   */
  search(searchText: string): void {
    console.log(searchText);
    // 現在のパスを検出
    console.log("path:" + location.pathname);

    // 検索表示画面でこのメソッドを実行するとcreatedメソッドは動かずリロードされないため、同一のページを行き来するように条件分岐する
    if (location.pathname.startsWith("/searchedList")) {
      // 入力欄を空にする
      this.searchText = "";
      // ドメイン以下のパス名が /searchedList/${searchText} の場合に実行する処理
      this.$router.push(`/2searchedList/${searchText}`);
      return;
    } else if (location.pathname.startsWith("/2searchedList")) {
      // 入力欄を空にする
      this.searchText = "";
      // ドメイン以下のパス名が /2searchedList/${searchText} の場合に実行する処理
      this.$router.push(`/searchedList/${searchText}`);
      return;
    }

    // 通常実行する処理
    // 入力欄を空にする
    this.searchText = "";
    this.$router.push(`/searchedList/${searchText}`);
    return;
  }
  /**
   * ログアウトする.
   */
  removeUser(): void {
    this.$store.commit("removeUser");
    console.log(this.$store.state.currentUser);
  }
}
</script>

<style scoped>
header {
  margin-bottom: 20px;
}
.headerContainer {
  margin: 0 auto;
  max-width: 1280px;
  display: flex;
}
.searchForm {
  display: flex;
}
textarea {
  width: 350px;
}
.searchForm {
  margin: 5px;
}
.userIcon {
  margin: 5px;
  width: 55px;
  height: 55px;
  object-fit: cover;
}
.userIcon {
  width: 55px;
  height: 55px;
  object-fit: cover;
}

.materialize-textarea {
  color: aliceblue;
}
</style>
