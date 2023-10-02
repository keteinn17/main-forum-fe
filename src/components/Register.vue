<template>
  <body>
    <div class="wrapper">
      <form @submit.prevent="handleRegister" :validation-schema="schema">
        <h1>Register</h1>
        <div class="input-box">
          <input
            label="Username:"
            type="text"
            placeholder="Username"
            v-model="user.username"
            required
          />
          <i class="bx bx-user"></i>
        </div>
        <div class="input-box">
          <input
            label="Email:"
            type="email"
            placeholder="Email"
            v-model="user.email"
            required
          />
          <i class="bx bx-envelope"></i>
          <span v-if="v$.user.email.$error">
            {{ v$.email.$errors[0].$message }}
          </span>
        </div>
        <div class="input-box">
          <input
            type="password"
            placeholder="Password"
            v-model="user.password"
            required
          />
          <i class="bx bxs-lock-alt"></i>
        </div>
        <div class="input-box">
          <input
            type="password"
            pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$"
            title="Wrong password"
            placeholder="Confirm password"
            v-model="user.confirmPassword"
            required
          />
          <i class="bx bxs-lock-alt"></i>
        </div>
        <div class="gender-wrapper">
          <div
            v-for="(gender, index) in genderList"
            :key="index"
            class="gender-option"
          >
            <input
              type="radio"
              name="gender"
              @change="setGenderValue(gender)"
            />
            <span class="gender-option-label">{{ gender }}</span>
          </div>
        </div>
        <div class="input-box">
          <input
            label="First Name:"
            type="text"
            placeholder="First name"
            v-model="user.firstName"
            required
          />
          <i class="bx bx-message-rounded-dots"></i>
        </div>
        <div class="input-box">
          <input
            label="Phone:"
            type="text"
            placeholder="Last name"
            v-model="user.lastName"
            required
          />
          <i class="bx bx-message-rounded-dots"></i>
        </div>
        <div class="input-box">
          <input
            type="date"
            placeholder="Date of birth"
            v-model="user.dateOfBirth"
          />
        </div>
        <button @submit="handleRegister" :disabled="loading" class="btn">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm"
          ></span>
          Register
        </button>
      </form>
    </div>
  </body>
</template>

<script>
import { register } from "@/api/userApi";
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

//import axios from "axios";
import * as yup from "yup";
//import { ref } from "vue";
//import { ErrorMessage } from "vee-validate";
// eslint-disable-next-line no-unused-vars
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//import { Form } from "vee-validate";

export default {
  name: "RegisterForm",
  components: {},
  data() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
    });
    return {
      v$: useValidate(),
      toggleRegister: false,
      schema,
      user: {
        username: "",
        email: "",
        gender: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
      },
      genderList: ["MALE", "FEMALE", "OTHER"],
      loading: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  watch: {
    user: {
      handler(newUser, oldUser) {
        console.log(newUser);
        console.log(oldUser);
      },
      deep: true,
    },
  },
  methods: {
    setGenderValue(gender) {
      this.user.gender = gender;
      console.log(this.user);
    },
    async handleRegister(response) {
      this.loading = true;
      console.log(this.user);
      console.log(this.v$);
      this.v$.$validate();
      if (this.v$.$error) {
        this.loading = false;
        alert(this.v$.$silentErrors);
      } else {
        try {
          await register(this.user).then((res) => {
            console.log(res);
          });
          this.loading = false;
          console.log(response);
          console.log("Success send request");
        } catch (e) {
          this.loading = false;
          console.log("error");
          console.log(e);
        }
      }
    },
  },
  validations() {
    return {
      user: {
        username: { required },
        email: { required, email },
        gender: { required },
        firstName: { required },
        lastName: { required },
        password: { required },
        confirmPassword: { required },
      },
    };
  },
};
</script>

<style scoped>
.spin-icon {
  color: red;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

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
}

.wrapper .gender-wrapper {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-around;
}
.gender-option {
  display: flex;
}
.gender-wrapper label {
  justify-content: space-between;
  margin-left: 2rem;
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
