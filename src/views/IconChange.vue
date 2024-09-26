<template>
  <div class="iconChange">
    <!-- <h4>プロフィール画像の編集</h4> -->
    <label for="iconChangeBtn">
      <img :src="image" alt="" class="circle responsive-img image" />
    </label>
    <input
      id="iconChangeBtn"
      type="file"
      ref="newImage"
      v-on:change="iconChange"
    />
    <button class="btn" @click="iconChangeButton()">画像を変更</button>
    <div>
      {{ this.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "IconChange",
  data() {
    return {
      image: "",
      message: "",
    };
  },
  methods: {
    iconChange() {
      const image = this.$refs.newImage.files[0];
      this.image = URL.createObjectURL(image);
    },
    iconChangeButton() {
      const id = Number(this.$route.params.id);
      this.$store.commit("changeAccountIcon", {
        id: id,
        img: this.image,
      });
      this.message = "画像を変更しました！";
    },
  },
  mounted() {
    const id = Number(this.$route.params.id);
    const account = this.$store.getters.getAccountById(id);
    const currentUser = this.$store.getters.getCurrentUser;
    if (account === undefined || account.id !== currentUser.id) {
      this.$router.push("/404");
    }
    this.image = account.img;
  },
};
</script>

<style scoped>
.iconChange {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.image {
  width: 80px;
  height: 80px;
}
.image:hover {
  opacity: 0.6;
  cursor: crosshair;
}
.btn {
  margin-top: 10px;
  height: 30px;
}
#iconChangeBtn {
  padding-top: 10px;
}
</style>
