<template>
  <div class="w-75">
        <UndoneItem v-for="item of undoneItems" :item="item" :key="item._id" />
  </div>
</template>

<script>
const axios = require("axios").default;
import UndoneItem from "./UndoneItem.vue";
import { mapGetters } from "vuex";
import call from "../fetch";
export default {
  name: "UndoneItems",
  components: {
    UndoneItem,
  },
  computed: {
    ...mapGetters(["undoneItems"]),
  },
  created() {
    // this.$store.commit("getLists");
    call.getItems();
  },
  // updated() {
  //   call.getItems();
  // },
};
</script>

<style></style>
