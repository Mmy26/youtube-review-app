<template>
  <div id="app">
    <CompHeader />
    <router-view />
    <CompFooter />
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import CompHeader from "./components/CompHeader.vue";
import CompFooter from "./components/CompFooter.vue";
@Component({
  components: {
    CompHeader,
    CompFooter,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
