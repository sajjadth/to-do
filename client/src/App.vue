<template>
  <div
    class="w-100 d-flex flex-column justify-content-center align-items-center"
    id="main"
  >
    <div
      class="d-flex w-100 align-items-start justify-content-start"
      id="navbar"
    >
      <Navbar></Navbar>
    </div>
    <div
      class="d-flex w-100 h-100 align-items-center justify-content-center"
      id="body"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "./style.sass";
// import "vue-router/dist/vue-router";
import "vuesax/dist/vuesax.css";
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
  },
  mounted() {
    // this.$store.commit("getRoute", this.$route.name);
    // this.$store.commit("getLogin");
  },
  // updated() {
  //   this.$store.commit("getRoute", this.$route.name);
  //   this.$store.commit("getLogin");
  // },
};
</script>

<style></style>
