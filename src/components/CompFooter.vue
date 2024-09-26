<template>
  <div>
    <footer>
      <div class="container">
        <div class="row">
          <div class="col s12 l6">
            <img src="/img/footerIcon.png" />
            <p>電話番号: 000-0000-0000</p>
            <p>住所: 東京都新宿区</p>
            <ul>
              <li class="grey-text">Twitter: @Google</li>
              <li class="grey-text">Instagram: @Google</li>
            </ul>
          </div>
          <div class="col s12 l4 offset-l1">
            <div class="googleMap">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14115048.751726352!2d-106.70968965!3d30.263962099999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b506293191ad%3A0xa35171da05d52d5f!2sGoogle!5e0!3m2!1sja!2sjp!4v1647428452379!5m2!1sja!2sjp"
                width="400"
                height="300"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
        <div class="scroll">
          <a href="#" id="page-top"
            ><i class="blogicon-chevron-up"></i>ページ上部へ戻る</a
          >
        </div>
        <div class="footer-copyright grey darken-5">
          <div class="container center-align">&copy; 2022 1月入社Aチーム</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {}
</script>

<style scoped>
footer {
  padding-top: 30px;
  background-color: #f2f2f2;
}
img {
  width: 280px;
  height: 170px;
  object-fit: cover;
}
.scroll {
  text-align: right;
}
#page-top {
  display: inline-block;
  font-weight: bold;
  padding: 0.7em;
  border-radius: 30px;
  background: #fff; /*背景色*/
  color: #666; /*文字色*/
  transition: 0.3s;
  margin-bottom: 10px;
}
#page-top:hover {
  background-color: #99ccff;
  color: #fff;
}
</style>
