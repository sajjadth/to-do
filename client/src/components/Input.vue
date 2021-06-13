<template>
  <form
    class="d-flex justify-content-center align-items-start w-100"
    id="input"
    @submit.prevent="addItem"
  >
    <vs-input
      placeholder="enter something"
      class="w-75"
      primary
      icon-after
      block
      v-model="newItem"
    >
      <template #icon>
        <span id="button">
          <i class="bi bi-plus"></i>
        </span>
      </template>
    </vs-input>
  </form>
</template>

<script>
const axios = require("axios").default;
import call from '../fetch'
import store from "../store";
export default {
  name: "Input",
  data() {
    return {
      newItem: "",
    };
  },
  methods: {
    addItem: function() {
      axios({
        method: "put",
        url: "http://localhost:5000/api/lists/addlist",
        headers: {
          "auth-token":
            localStorage.getItem("token") || sessionStorage.getItem("token"),
        },
        data: {
          content: this.newItem,
        },
      })
        .then((res) => {
          if (res.status === 200 && res.data.success === true) {
            store.commit("setLists", res.data.data);
            this.newItem = "";
            call.getItems();
          } else {
            console.log("else in put list in db ");
          }
        })
        .catch((err) => console.log("error in puting data in list", err));
    },
  },
};
</script>

<style></style>
