<template>
  <div class="w-100 h-100 d-flex flex-column">
    <div
      class="d-flex flex-column w-100 h-100 justify-content-center align-items-center"
      v-if="!login"
    >
      <h1 class="" id="home-title">
        first create<br />account or login<br />to your account.
      </h1>
    </div>
    <div
      class="d-flex flex-column w-100 h-100 justify-content-center align-items-center"
      v-else
    >
      <Input />
      <div
        class="d-flex flex-column w-100 justify-content-start mt-4 align-items-center h-100"
        mt-4
        id="output"
      >
        <UndoneItems v-if="this.$store.state.items.length" />
        <DoneItems v-if="this.$store.state.items.length" />
        <p v-else>nothing to show</p>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "../components/Input.vue";
import UndoneItems from "../components/UndoneItems.vue";
import DoneItems from "../components/DoneItems.vue";
import call from "../fetch";
export default {
  name: "Home",
  data() {
    return {
      login:
        localStorage.getItem("token") || sessionStorage.getItem("token")
          ? true
          : false,
    };
  },
  created() {
    call.getItems();
  },
  // updated() {
  //   call.getItems();
  // },
  components: {
    UndoneItems,
    DoneItems,
    Input,
  },
};
</script>

<style></style>
