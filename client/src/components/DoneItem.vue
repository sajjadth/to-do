<template>
  <div v-if="item.status === true" class="list">
    <div
      checkbox
      class="m-0 pl-2 p-0 td-l d-flex flex-row justify-content-between"
    >
      <vs-checkbox
        v-model="done"
        :checked="done"
        line-through
        success
        @change="changeStatus"
      >
        {{ item.content }}
      </vs-checkbox>
      <div class="done-btn">
        <vs-button transparent danger @click="deleteItem" class="p-0 m-0 w-100 h-100">
          <i class="bi bi-trash-fill"></i>
          <!-- <i class="bi bi-trash"></i> -->
        </vs-button>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
import call from "../fetch";
export default {
  name: "DoneItem",
  props: ["item"],
  data() {
    return {
      done: this.item.status,
    };
  },
  methods: {
    changeStatus: function() {
      call.changeStatus(this.item._id, this.done);
      console.log(this.item._id + " " + this.done);
    },
    deleteItem: function() {
      call.deleteItem(this.item._id);
    },
  },
};
</script>

<style></style>
