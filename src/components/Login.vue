<!-- eslint-disable no-unused-vars -->
<template>
  <div class="card card-container">
    <img
      id="profile-img"
      src="https://voz.vn/attachments/untitle11d-jpg.490668/"
      class="profile-img-card"
    />
    <Form @submit.prevent="handleLogin" :validation-schema="schema">
      <!-- <label for="username" class="form-label"></label> -->
      <input
        name="username"
        type="text"
        class="form-group"
        v-model="email"
        placeholder="Email"
      />
      <br />
      <!-- <ErrorMessage name="username" class="error-feedback" /> -->

      <!-- <label for="password" class="form-label"></label> -->
      <input
        name="password"
        type="password"
        class="form-group"
        v-model="password"
        placeHolder="Password"
      />
      <!-- <ErrorMessage name="password" class="error-feedback" /> -->
      <br />
      <button class="login-button" :disabled="loadingJWT" @click="handleLogin">
        <span
          v-show="loadingJWT"
          class="spinner-border spinner-border-sm"
        ></span>
        <span>Login</span>
      </button>
      <br />
      <GoogleLogin :callback="handleGoogleLogin" />
      <div class="sign_up">
        <h6>
          Don't have an account?<a
            class="sign-up-link"
            href="http://localhost:8081/register"
            >Sign up</a
          >
        </h6>
      </div>
      <div>
        <div v-if="message" class="alert alert-danger" role="alert">
          {{ message }}
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form } from "vee-validate";
import * as yup from "yup";
// eslint-disable-next-line no-unused-vars
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import { loginByGoogle } from "@/api/userApi";

//import authService from "@/services/auth.service";

export default {
  name: "LoginVue",
  components: {
    Form,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Email is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loadingJWT: false,
      loadingGg: false,
      message: "",
      schema,
      email: "",
      password: "",
      isLoginGg: false,
      callback: (response) => {
        console.log("Login");
        console.log(response);
        this.$router.push("/profile");
      },
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    async handleLogin(user) {
      this.loadingJWT = true;
      user.email = this.email;
      user.password = this.password;
      this.$store.dispatch("auth/login", user).then(
        (response) => {
          console.log(response);
          // localStorage.setItem("user", JSON.stringify(response.access_token));
          // localStorage.setItem("role", JSON.stringify(response.role));
          this.loadingJWT = false;
          this.$router.push("/");
        },
        (error) => {
          this.loadingJWT = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    handleGoogleLogin(response) {
      this.loadingJWT = true;
      try {
        console.log("Handle the response", response);
        if (response) {
          localStorage.setItem("user", JSON.stringify(response.credential));
          console.log("set token to local storage: ", response.credential);
          this.loadingJWT = false;
          this.$router.push("/");
        }
      } catch (error) {
        this.loadingJWT = false;
        this.message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
}
.card-container {
  position: absolute;
  background-color: #c0c0c0;
  width: 500px;
  height: fit-content;
  padding: 10px;
  border-radius: 10px;
  animation: fadeIn 0.3s;
  display: flex;
  margin: 0;
  margin-top: 12rem;
  margin-left: 24rem;
}

.profile-img-card {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 30%;
  margin-bottom: 4%;
  margin-top: 4%;
}

.form-group {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  width: 50%;
  height: 50px;
  padding: 0 20px;
  transition: 0.25s ease;
  /* margin-bottom: 2px;
  margin-left: 30%; */
}

.login-button,
.google-login-button {
  width: 100%;
  background-color: #5c7099;
  padding: 12px;
  color: white;
  border-radius: 5px;
  margin-top: 5px;
}
.sign_up {
  display: flex;
  justify-content: space-evenly;
}
a.sign-up-link:hover {
  font-size: 150%;
}
</style>
