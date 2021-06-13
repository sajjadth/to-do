<template>
  <nav class="navbar d-flex w-100 flex-row bg-mute">
    <div>
      <router-link v-if="login" to="/profile" class="navbar-brand">
        <vs-avatar id="avatar" :dark="$route.name === 'profile'">
          <template #text>
            {{ name }}
          </template>
        </vs-avatar>
      </router-link>
      <router-link to="/login" v-else class="navbar-brand">
        <vs-button
          flat
          circle
          transparent
          dark
          :active="$route.name === 'login' || $route.name === 'signup'"
          value="login"
          animation-type="vertical"
        >
          login
          <template #animate><i class="bi bi-box-arrow-in-right"></i></template>
        </vs-button>
      </router-link>
    </div>
    <vs-button
      flat
      circle
      transparent
      dark
      animation-type="vertical"
      :active="$route.name === 'home'"
      value="home"
      to="/"
    >
      home
      <template #animate> <i class="bi bi-house"></i></template
    ></vs-button>
  </nav>
</template>

<script>
const axios = require("axios").default;
export default {
  name: "Navbar",
  props: ["active", "info"],
  data() {
    return {
      login:
        localStorage.getItem("token") || sessionStorage.getItem("token")
          ? true
          : false,
      name: "",
    };
  },
  created(){
    axios({
        method: "get",
        url: "http://localhost:5000/api/users/user",
        headers: {
          "auth-token":
            localStorage.getItem("token") || sessionStorage.getItem("token"),
        },
      })
        .then((res) => {
         this.name = res.data.firstName
        })
        .catch((err) => console.log("error in get user info from db:", err))
},

};
</script>

<style></style>
