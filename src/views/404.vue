<template>
  <div>
    <div>存在しない画面です</div>
    <button @click="toTop">TOPへ</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  toTop(): void {
    this.$router.push("/top");
  }
}
</script>

<style scoped></style>
