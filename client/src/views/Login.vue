<template>
  <div
    id="login"
    class="w-100 d-flex flex-column justify-content-center align-items-center h-100 "
  >
    <h3>login</h3>
    <form
      @submit.prevent="submit"
      class="w-100 d-flex justify-content-center align-items-center flex-column"
    >
      <vs-input
        type="text"
        placeholder="username"
        block
        class="w-75 m-2"
        gradient
        success
        v-model="username"
        required
        autocomplete="off"
      >
        <template #icon><i class="bi bi-person"></i></template>
      </vs-input>
      <vs-input
        type="password"
        placeholder="password"
        block
        class="w-75 m-2"
        gradient
        success
        v-model="password"
        required
        autocomplete="off"
        :visiblePassword="hasVisiblePassword"
        @click-icon="hasVisiblePassword = !hasVisiblePassword"
      >
        <template #icon>
          <i class="bi bi-eye-slash-fill" v-if="hasVisiblePassword"></i>
          <i class="bi bi-eye-fill" v-else></i
        ></template>
      </vs-input>
      <vs-checkbox
        type="checkbox"
        success
        v-model="isRemember"
        class="w-75 p-0 ml-4"
        size="mini"
      >
        remember me
      </vs-checkbox>
      <div class="text-center m-0 p-0" id="fail" v-if="fail">
        <p>username or password is incorrect</p>
      </div>
      <vs-button
        type="submit"
        block
        flat
        class="w-75 m-2"
        gradient
        success
        :loading="loading"
        >login</vs-button
      >
    </form>
    <div class="d-flex flex-row justify-content-between w-75 m-2">
      <vs-button
        flat
        transparent
        class="m-2"
        gradient
        success
        @click="forgotPassword = true"
        disabled
        >Forgot password?</vs-button
      >
      <vs-button flat transparent class="m-2" to="/signup" gradient success
        >Don't have an account?</vs-button
      >
    </div>
    <!-- forgot password -->
    <vs-dialog width="550px" not-center v-model="forgotPassword">
      <template #header>
        <h4 class="not-margin text-center">forgot password</h4>
      </template>

      <div class="con-content align-items-center d-flex flex-column w-100">
        <vs-input
          type="text"
          class="w-75 m-4"
          block
          flat
          label-placeholder="username"
          v-model.lazy="passwordForgotUsername"
        >
          <template
            #message-danger
            v-if="
              passwordForgotUsername !== trueUsername &&
                passwordForgotUsername !== ''
            "
            >username incorrect</template
          ></vs-input
        >
        <vs-input
          type="email"
          class="w-75 m-4"
          block
          flat
          label-placeholder="email"
          v-model.lazy="passwordForgotEmail"
        >
          <template
            #message-danger
            v-if="
              passwordForgotEmail !== trueEmail && passwordForgotEmail !== ''
            "
            >email incorrect</template
          ></vs-input
        >
      </div>
      <template #footer>
        <div class="con-footer d-flex">
          <vs-button
            success
            @click="(forgotPasswordChange = true), (forgotPassword = false)"
            transparent
          >
            continue
          </vs-button>
          <vs-button @click="forgotPassword = false" dark transparent>
            Cancel
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <!-- change password -->
    <vs-dialog width="550px" not-center v-model="forgotPasswordChange">
      <template #header>
        <h4 class="not-margin text-center">change password</h4>
      </template>

      <div class="con-content align-items-center d-flex flex-column w-100">
        <vs-input
          type="password"
          class="w-75 m-4"
          block
          flat
          label-placeholder="new password"
          v-model.lazy="newPassword"
        >
          <template
            #message-danger
            v-if="
              passwordForgotUsername !== trueUsername &&
                passwordForgotUsername !== ''
            "
            >username incorrect</template
          ></vs-input
        >
        <vs-input
          type="password"
          class="w-75 m-4"
          block
          flat
          label-placeholder="confirm password"
          v-model.lazy="newPasswordConfirm"
        >
          <template
            #message-danger
            v-if="
              passwordForgotEmail !== trueEmail && passwordForgotEmail !== ''
            "
            >email incorrect</template
          ></vs-input
        >
      </div>
      <template #footer>
        <div class="con-footer d-flex">
          <vs-button
            :loading="newPasswordChangeLoading"
            success
            @click="changePasword"
            transparent
          >
            change
          </vs-button>
          <vs-button @click="forgotPasswordChange = false" dark transparent>
            Cancel
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  name: "Login",
  data() {
    return {
      password: "",
      username: "",
      isRemember: false,
      loading: false,
      fail: false,
      forgotPassword: false,
      forgotPasswordChange: false,
      passwordForgotEmail: "",
      passwordForgotUsername: "",
      trueEmail: "",
      trueUsername: "",
      newPassword: "",
      newPasswordConfirm: "",
      newPasswordChangeLoading: false,
      hasVisiblePassword: false,
    };
  },
  methods: {
    submit: function() {
      this.loading = true;
      axios
        .post("http://localhost:5000/api/users/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          if (res.status === 200 && res.data.success === true) {
            if (this.isRemember) {
              localStorage.setItem("token", res.data.token);
              window.location.replace("/");
              this.loading = false;
            } else {
              sessionStorage.setItem("token", res.data.token);
              window.location.replace("/");
              this.loading = false;
            }
          }
        })
        .catch((err) => console.log("error in login : ", err));
    },
    forgotOldPassword: function() {
      if (
        this.trueEmail === this.passwordForgotEmail &&
        this.trueUsername === this.passwordForgotUsername
      ) {
        (this.forgotPassword = false), (this.forgotPasswordChange = true);
      }
    },
    openNotification(position = null, color) {
      const noti = this.$vs.notification({
        progress: "auto",
        color,
        position,
        title: "reset password",
        text: `your password successfully changed, from now on use new password`,
      });
    },
    changePasword: function() {
      this.newPasswordChangeLoading = true;
      if (this.newPassword === this.newPasswordConfirm) {
        setTimeout(() => {
          this.newPasswordChangeLoading = false;
          localStorage.setItem("password", this.newPassword);
          this.forgotPasswordChange = false;
          this.openNotification("botton-right", "success");
        }, 3000);
      }
    },
  },
};
</script>
