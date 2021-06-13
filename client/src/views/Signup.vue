<template>
  <div
    id="signup"
    class="w-100 d-flex flex-column justify-content-center align-items-center h-100"
  >
    <h3 class="mb-4">signup</h3>
    <form
      @submit.prevent="submit"
      class="w-100 d-flex justify-content-center align-items-center flex-column"
    >
      <div class="d-flex flex-row w-100">
        <vs-input
          type="text"
          label-placeholder="first name"
          block
          class="w-100 m-3"
          gradient
          success
          v-model="firstName"
          required
          autocomplete="off"
        >
        </vs-input>
        <vs-input
          type="text"
          label-placeholder="last name"
          block
          class="w-100 m-3"
          gradient
          success
          v-model="lastName"
          required
          autocomplete="off"
        >
        </vs-input>
      </div>
      <div class="d-flex flex-row w-100">
        <vs-input
          type="text"
          label-placeholder="username"
          block
          class="w-100 m-3"
          gradient
          success
          v-model="username"
          required
          autocomplete="off"
        >
        </vs-input>
      </div>
      <div class="d-flex flex-row w-100">
        <vs-input
          type="email"
          label-placeholder="email"
          block
          class="w-100 m-3"
          gradient
          success
          v-model="email"
          required
          autocomplete="off"
        >
        </vs-input>
      </div>
      <div class="d-flex flex-row w-100">
        <vs-input
          type="password"
          label-placeholder="password"
          block
          class="w-100 m-3"
          gradient
          success
          v-model.lazy="password"
          required
          autocomplete="off"
        >
        </vs-input>
        <vs-input
          type="password"
          label-placeholder="confirm password"
          block
          class="w-100 m-3"
          gradient
          success
          v-model.lazy="passwordConfirm"
          required
          autocomplete="off"
        >
          <template
            #message-danger
            v-if="password !== passwordConfirm && passwordConfirm !== ''"
            >password not match</template
          >
          <template
            v-else-if="password === '' && passwordConfirm === ''"
          ></template>
        </vs-input>
      </div>
      <div class="d-flex flex-row w-100">
        <vs-button
          type="submit"
          block
          flat
          class="w-100 m-3"
          gradient
          success
          :loading="loading"
          >signup</vs-button
        >
        <vs-button
          flat
          transparent
          class="m-3 w-25"
          to="/login"
          gradient
          success
          >login</vs-button
        >
      </div>
    </form>
    <p class="text-center w-75" id="signup-footer">
      By clicking Sign Up, you are indicating that you have read and acknowledge
      the
      <a id="link" @click="termsAction">Terms of Service</a>
      and <a id="link" @click="privacyAction">Privacy Notice</a>.
    </p>
    <vs-dialog v-model="privacyActive" width="500px">
      <template #header>
        <h4>Privacy Notice</h4>
      </template>
      <div class="con-content">
        <p>
          Vuesax is a relatively new framework with a refreshing design and in
          the latest trends, vuesax based on vuejs which means that we go hand
          in hand with one of the most popular javascript frameworks in the
          world and with a huge community with which you will have all the help
          and documentation to create and make your project
        </p>
      </div>
      <template #footer>
        <div class="con-footer">
          <vs-button transparent @click="privacyActive = false">ok</vs-button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog v-model="termsActive" width="500px">
      <template #header>
        <h4>terms and conditions</h4>
      </template>
      <div class="con-content">
        <p>
          Vuesax is a relatively new framework with a refreshing design and in
          the latest trends, vuesax based on vuejs which means that we go hand
          in hand with one of the most popular javascript frameworks in the
          world and with a huge community with which you will have all the help
          and documentation to create and make your project
        </p>
      </div>
      <template #footer>
        <div class="con-footer">
          <vs-button transparent @click="termsActive = false">ok</vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  name: "Signup",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      username: "",
      passwordConfirm: "",
      termsActive: false,
      privacyActive: false,
      loading: false,
    };
  },
  methods: {
    submit: function() {
      this.loading = true;
      axios
        .post("http://localhost:5000/api/users/register", {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (res.status === 200 && res.data.success === true) {
            this.loading = false;
            window.location.replace("/");
          }
        })
        .catch((err) => {
          console.log("error in post user data:", err);
        });
    },
    termsAction: function() {
      this.termsActive = !this.termsActive;
    },
    privacyAction: function() {
      this.privacyActive = !this.privacyActive;
    },
  },
};
</script>

<style></style>
