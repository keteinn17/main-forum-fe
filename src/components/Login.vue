<!-- eslint-disable no-unused-vars -->
<template>
  <body>
    <div class="wrapper">
      <form @submit.prevent="handleLogin">
        <h1>Login</h1>
        <div class="input-box">
          <input
            name="username"
            type="text"
            v-model="email"
            placeholder="Email"
            required
          />
          <i class="bx bx-user"></i>
        </div>
        <div class="input-box">
          <input
            name="password"
            type="password"
            v-model="password"
            placeHolder="Password"
            required
          />
          <i class="bx bxs-lock-alt"></i>
        </div>
        <div class="remember-forgot">
          <label><input type="checkbox" />Remember me</label>
          <a href="#">Forgot Password?</a>
        </div>
        <button :disabled="loadingJWT" @click="handleLogin" class="btn">
          <span
            v-show="loadingGg"
            class="spinner-border spinner-border-sm"
          ></span>
          Login
        </button>
        <br />
        <div class="google-login">
          <GoogleLogin :callback="handleGoogleLogin" />
        </div>
        <div class="register-link">
          <p>
            Don't have an account?
            <a href="http://localhost:8081/register">Register</a>
          </p>
        </div>
        <div>
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </form>
    </div>
  </body>
</template>

<script>
// eslint-disable-next-line no-unused-vars
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
  components: {},
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
      this.loadingGg = true;
      try {
        console.log("Handle the response", response);
        if (response) {
          localStorage.setItem("user", JSON.stringify(response.credential));
          console.log("set token to local storage: ", response.credential);
          this.loadingJWT = false;
          this.$router.push("/");
          window.location.href = "http://localhost:8081/";
        }
        // const headers = {
        //   "Access-Control-Allow-Origin": "*",
        // };
        // const response = await axios.get(
        //   "http://localhost:8082/api/v1/auth/login_google",
        //   headers
        // );
        // console.log(response);
        // window.location.href = response.data;
        // const token = this.getJwtTokenFromUrl();
        // console.log(token);
      } catch (error) {
        this.loadingGg = false;
        this.message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    },
    async handleGoogleLogin2() {
      this.loadingGg = true;
      try {
        const headers = {
          "Access-Control-Allow-Origin": "*",
        };
        const response = await axios.get(
          "http://localhost:8082/api/v1/auth/login_google",
          headers
        );
        console.log(response);
        window.location.href = response.data;
        const token = this.getJwtTokenFromUrl();
        console.log(token);
      } catch (error) {
        this.loadingGg = false;
        this.message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    },
    getJwtTokenFromUrl() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("token");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url("https://wallpaperaccess.com/full/39639.jpg") no-repeat;
  background-size: cover;
  background-position: center;
}

.wrapper {
  width: 420px;
  background: transparent;
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 30px 40px;
}

.wrapper h1 {
  font-size: 36px;
  text-align: center;
}

.wrapper .input-box {
  position: relative;
  width: 100%;
  height: 50px;
  margin: 30px 0;
}

.input-box input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  font-size: 16px;
  color: #fff;
  padding: 20px 45px 20px 20px;
}

.input-box input::placeholder {
  color: #fff;
}

.input-box i {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: black;
}

.wrapper .remember-forgot {
  display: flex;
  justify-content: space-between;
  font-size: 14.5px;
  margin: -15px 0 15px;
}
.remember-forgot label input {
  accent-color: #fff;
  margin-right: 3px;
}
.remember-forgot a {
  color: #fff;
  text-decoration: none;
}

.remember-forgot a:hover {
  text-decoration: underline;
}
.wrapper .google-login {
  margin-top: 2rem;
  margin-left: 4rem;
}

.wrapper .btn {
  width: 100%;
  height: 45px;
  background: #fff;
  border: none;
  outline: none;
  border-radius: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

.wrapper .register-link {
  font-size: 14.5px;
  text-align: center;
  margin: 20px 0 15px;
}

.register-link p a {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
}

.register-link p a:hover {
  text-decoration: underline;
}
</style>
