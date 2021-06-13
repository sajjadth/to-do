<template>
  <div
    class="w-100 h-100 d-flex flex-column justify-content-center align-items-center"
    id="profile"
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
        disabled
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
        disabled
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
        disabled
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
        disabled
      >
      </vs-input>
    </div>
    <div class="d-flex flex-row w-100">
      <vs-button flat class="w-100 m-1 ml-3" @click="passwordReset = true"
        >change password</vs-button
      >
      <vs-button flat class="m-1 w-100" @click="logout" :loading="logoutLoading"
        >log out</vs-button
      ><vs-button
        flat
        danger
        class="m-1 mr-3 w-100"
        @click="accountDoubleCheck = true"
      >
        delete my account</vs-button
      >
    </div>
    <!-- delete account -->

    <vs-dialog width="550px" not-center v-model="accountDoubleCheck">
      <template #header>
        <h4 class="not-margin text-center">Are you sure?</h4>
      </template>

      <div class="con-content">
        <p class="mb-4">
          Deleting your account is permanent and will remove all content
          including all list's, avatars and profile settings. Are you sure you
          want to delete your account?
        </p>
        <vs-input
          type="password"
          placeholder="confirm password"
          block
          class="w-75 mt-4"
          gradient
          primary
          v-model.lazy="deletePassword"
          autocomplete="off"
        >
          <template #message-danger v-if="deleteError"
            >password is incorrect</template
          >
        </vs-input>
      </div>

      <template #footer>
        <div class="con-footer d-flex">
          <vs-button
            :loading="deleteLoading"
            danger
            @click="deleteAccount"
            transparent
          >
            yes
          </vs-button>

          <vs-button @click="accountDoubleCheck = false" dark transparent>
            Cancel
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <!-- change password -->
    <vs-dialog width="550px" not-center v-model="passwordReset">
      <template #header>
        <h4 class="not-margin text-center">change password</h4>
      </template>

      <div class="con-content align-items-center d-flex flex-column w-100">
        <vs-input
          type="password"
          class="w-75 mt-4 mb-2"
          block
          flat
          label-placeholder="old password"
          v-model.lazy="resetPasswordOld"
        ></vs-input>
        <vs-input
          type="password"
          class="w-75 mt-4 mb-2"
          block
          flat
          label-placeholder="new password"
          v-model.lazy="resetPasswordNew"
        ></vs-input>
        <vs-input
          type="password"
          class="w-75 mt-4 mb-2"
          block
          flat
          label-placeholder="confirm password"
          v-model.lazy="resetPasswordNewConfirm"
        >
          <template
            #message-danger
            v-if="
              resetPasswordNew !== resetPasswordNewConfirm &&
                resetPasswordNewConfirm !== ''
            "
            >password not match</template
          ></vs-input
        >
      </div>
      <template #footer>
        <div class="con-footer d-flex">
          <vs-button
            :loading="resetPasswordLoading"
            success
            @click="resetPassword"
            transparent
          >
            confirm
          </vs-button>
          <vs-button @click="passwordReset = false" dark transparent>
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
  name: "Profile",
  data() {
    return {
      deleteLoading: false,
      logoutLoading: false,
      accountDoubleCheck: false,
      passwordReset: false,
      resetPasswordLoading: false,
      deleteError: false,
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      resetPasswordOld: "",
      resetPasswordNew: "",
      resetPasswordNewConfirm: "",
      deletePassword: "",
    };
  },
  methods: {
    logout: function() {
      this.logoutLoading = true;
      setTimeout(() => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.replace("/");
      }, 3000);
    },
    deleteAccount: function() {
      this.deleteLoading = true;
      axios({
        method: "delete",
        url: "http://localhost:5000/api/users/delete",
        data: {
          password: this.deletePassword,
        },
        headers: {
          "auth-token":
            localStorage.getItem("token") || sessionStorage.getItem("token"),
        },
      })
        .then((res) => {
          if (res.data.success === true) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.replace("/");
            this.deleteLoading = false;
          } else {
            this.deleteError = true;
            this.deleteLoading = false;
          }
        })
        .catch((err) => console.log("error in delete user:", err));
    },
    resetPassword: function() {
      if (
        this.resetPasswordNew === this.resetPasswordNewConfirm &&
        this.resetPasswordNew &&
        this.resetPasswordNewConfirm
      ) {
        if (this.resetPasswordOld !== this.resetPasswordNew) {
          this.resetPasswordLoading = true;
          axios({
            method: "put",
            url: "http://localhost:5000/api/users/user/edit/password",
            headers: {
              "auth-token":
                localStorage.getItem("token") ||
                sessionStorage.getItem("token"),
            },
            data: {
              password: this.resetPasswordOld,
              newPassword: this.resetPasswordNew,
            },
          })
            .then((res) => {
              this.passwordReset = false;
              this.resetPasswordLoading = true;
              this.openNotification("botton-right", "success");
            })
            .catch((err) => {
              console.log("error in changing password:", err);
            });
        }
      }
    },
    openNotification(position = null, color) {
      const noti = this.$vs.notification({
        progress: "auto",
        color,
        position,
        title: "change password",
        text: `your password successfully changed, from now on use new password`,
      });
    },
  },
  created() {
    axios({
      method: "get",
      url: "http://localhost:5000/api/users/user",
      headers: {
        "auth-token":
          localStorage.getItem("token") || sessionStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          (this.firstName = res.data.firstName),
            (this.lastName = res.data.lastName),
            (this.email = res.data.email),
            (this.username = res.data.username);
        }
      })
      .catch((err) => console.log("error in get user info from db:", err));
  },
};
</script>

<style></style>
