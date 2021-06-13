<template>
  <div class="w-75">
        <DoneItem v-for="item of doneItems" :item="item" :key="item._id" />
  </div>
</template>

<script>
const axios = require("axios").default;
import DoneItem from "./DoneItem.vue";
import call from '../fetch'
import {mapGetters} from 'vuex'
export default {
  name: "DoneItems",
  data() {
    return {
      items: null,
    };
  },
  computed:{
    ...mapGetters([
      "doneItems"
    ])
  },
  components: {
    DoneItem,
  },
  created() {
    call.getItems()
  },
  // updated(){
  //   call.getItems()
  // }
};
</script>

<style></style>
