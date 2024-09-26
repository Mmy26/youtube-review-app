<template>
  <div>
    <div class="container">
      <div class="row login-page">
        <div class="col s12 z-depth-6 card-panel">
          <div class="pageTitle">ログイン</div>
          <div class="error">{{ loginError }}</div>
          <form class="login-form" action="employeeList.html">
            <div class="row"></div>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">mail_outline</i>
                <input
                  class="validate"
                  id="mailAddress"
                  type="email"
                  v-model="email"
                />
                <label for="mailAddress" data-error="wrong" data-success="right"
                  >メールアドレス</label
                >
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">lock_outline</i>
                <input id="password" type="password" v-model="password" />
                <label for="password">パスワード</label>
              </div>
            </div>
            <div class="row login-btn">
              <button class="btn" type="button" v-on:click="login()">
                <span>ログイン</span>
              </button>
            </div>
            <div class="row">
              <div class="input-field col s6 m6 l6">
                <p class="margin medium-small">
                  <router-link to="/registerUser">会員登録はこちら</router-link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Account } from "@/types/Account";
@Component
export default class XXXComponent extends Vue {
  // メールアドレス
  private email = "";
  // パスワード
  private password = "";
  // エラー文
  private loginError = "";

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
  }

  /**
   * ログイン.
   */
  public login(): void {
    this.loginError = "";
    const accountList = this.$store.getters.getAccountList;

    for (const account of accountList) {
      if (
        account.mailaddless === this.email &&
        account.password === this.password
      ) {
        const currentAccount = new Account(
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

        this.$store.commit("addCurrentUser", currentAccount);
        this.$router.push("/top");
        return;
      }
    }

    this.loginError = "メールアドレスまたはパスワードが誤っています";
  }
}
</script>

<style scoped></style>
