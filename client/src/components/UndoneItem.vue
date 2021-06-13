<template>
  <div v-if="item.status === false" class="list">
    <div checkbox class="m-0 pl-2 p-0 d-flex flex-row justify-content-between" >
      <vs-checkbox
        v-model="done"
        :checked="done"
        line-through
        success
        @change="changeStatus"
      >
        {{ item.content }}
      </vs-checkbox>
    </div>
  </div>
</template>

<script>
import call from "../fetch";
export default {
  name: "UndoneItem",
  props: ["item"],
  data() {
    return {
      done: this.item.status,
    };
  },
  methods: {
    changeStatus: function() {
      call.changeStatus(this.item._id, this.done);
    },
  },
};
</script>

<style></style>
