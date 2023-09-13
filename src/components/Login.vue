<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="https://voz.vn/attachments/untitle11d-jpg.490668/"
        class="profile-img-card"
      />
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="username"></label>
          <Field
            name="username"
            type="text"
            class="form-control"
            v-model="email"
            placeholder="Email"
          />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password"></label>
          <Field
            name="password"
            type="password"
            class="form-control"
            v-model="password"
            placeHolder="Password"
          />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-login">
          <button
            class="btn btn-primary btn-block login-button"
            :disabled="loadingJWT"
          >
            <span
              v-show="loadingJWT"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
          <button
            class="btn btn-primary btn-block google-login-button"
            @click="handleGoogleLogin"
            :disabled="loadingGg"
          >
            <span
              v-show="loadingGg"
              class="spinner-border spinner-border-sm"
            ></span>
            <i class="fab fa-google"></i>
            <span>Login with Google</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "LoginVue",
  components: {
    Form,
    Field,
    ErrorMessage,
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
    handleLogin(user) {
      this.loadingJWT = true;
      user.email = this.email;
      user.password = this.password;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c0c0c0;
  border: 1cap;
  position: relative;
}
.profile-img-card {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-group {
  display: flex;
  justify-content: space-between;
  background-color: aqua;
}

.button-group button {
  flex-basis: 48%; /* Adjust the width as needed */
}
.form-group {
  color: #b4886b;
  font-weight: bold;
  width: 260px;
  float: none;
}
.error-feedback {
  color: red;
}
.fa-google {
  margin-left: -20px;
}
</style>
