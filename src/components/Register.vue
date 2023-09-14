<template>
  <div class="container" @click="toggleRegister = false">
    <div class="overlay">
      <div class="content">
        <div class="title">Register Form</div>
        <div class="close-button" @click="toggleRegister = false">
          <FontAwesomeIcon icon="faClose" />
        </div>
        <form
          @submit.prevent="handleRegister"
          class="form-field"
          :validation-schema="schema"
        >
          <label for="name" class="form-label">Username</label>
          <input
            class="form-input"
            label="Username:"
            type="text"
            placeholder="Username"
            v-model="user.username"
          />
          <br />
          <label for="email" class="form-label">Email:</label>
          <input
            class="form-input"
            label="Email:"
            type="email"
            placeholder="Email"
            v-model="user.email"
          />
          <span v-if="v$.user.email.$error">
            {{ v$.email.$errors[0].$message }}
          </span>
          <br />
          <!-- <label for="Gender" class="form-label">Gender:</label> -->
          <div class="gender-wrapper">
            <label class="gender-label">Gender:</label>
            <div
              v-for="(gender, index) in genderList"
              :key="index"
              class="gender-option"
            >
              <input
                type="radio"
                :checked="user.gender === gender"
                @change="setGenderValue(gender)"
              />
              <span class="gender-option-label">{{ gender }}</span>
            </div>
          </div>
          <label for="First name" class="form-label">First Name:</label>
          <input
            class="form-input"
            label="First Name:"
            type="text"
            placeholder="First name"
            v-model="user.firstName"
          />
          <br />
          <label for="Last Name" class="form-label">Last Name:</label>
          <input
            class="form-input"
            label="Phone:"
            type="text"
            placeholder="Last name"
            v-model="user.lastName"
          />
          <br />
          <label for="Date of birth" class="form-label">Date of birth:</label>
          <input
            class="form-input"
            label="First Name:"
            type="date"
            placeholder="Date of birth"
            v-model="user.dateOfBirth"
          />
          <br />
          <!-- <label for="phone" class="form-label">Phone number</label> -->
          <label for="Password" class="form-label">Password:</label>
          <input
            class="form-input"
            label="Password:"
            type="password"
            placeholder="Password"
            v-model="user.password"
          />
          <!-- <label for="password" class="form-label">Password</label> -->
          <br />
          <label for="Confirm Password" class="form-label"
            >Confirm Password:</label
          >
          <input
            class="form-input"
            label="Confirm password:"
            type="password"
            placeholder="Confirm password"
            v-model="user.confirmPassword"
          />
          <!-- <label for="confirmPassword" class="form-label" placeHolder=""
            >Confirm password</label
          > -->
          <div>
            <button
              class="register-button"
              @submit="handleRegister"
              :disabled="loading"
            >
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Sign up</span>
            </button>
          </div>
        </form>
        <div v-if="loading" class="loading-indicator">
          <FontAwesomeIcon class="spin-icon" icon="faSpinner" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from "@/api/userApi";
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

//import axios from "axios";
import * as yup from "yup";
//import { ref } from "vue";
//import { ErrorMessage } from "vee-validate";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//import { Form } from "vee-validate";

export default {
  name: "RegisterForm",
  components: {
    FontAwesomeIcon,
  },
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
  methods: {
    setGenderValue(gender) {
      this.user.gender = gender;
      console.log(this.user);
    },
    async handleRegister() {
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

.form-input {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  width: 50%;
  height: 50px;
  padding: 0 20px;
  transition: 0.25s ease;
  margin-bottom: 2px;
  margin-left: 30%;
}

.form-input:focus {
  border-color: #6a5af9;
}

.form-field {
  position: relative;
}
.form-label {
  position: absolute;
  transform: translateY(50%);
  user-select: none;
  color: black;
  pointer-events: none;
  margin-right: 10%;
}
/* .form-input:focus + .form-label {
  top: 0.5rem;
} */
.overlay {
  position: relative;
  background-color: #c0c0c0;
  width: 500px;
  height: fit-content;
  padding: 10px;
  border-radius: 10px;
  animation: fadeIn 0.3s;
}

.title {
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 8px;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px;
  font-size: 20px;
  cursor: pointer;
}

form {
  /* Form styles */
}

.gender-wrapper {
  display: flex;
  margin-bottom: 1px;
  margin-left: -1%;
}

.gender-label {
  /* display: none; */
  min-width: 160px;
  color: black;
}

.gender-option {
  display: flex;
  align-items: center;
  margin-right: 1re;
  margin-left: 7%;
}

.gender-option input[type="radio"] {
  /* Radio button styles */
}

.gender-option-label {
  margin-left: 1px;
}

.register-button {
  width: 100%;
  background-color: #5c7099;
  padding: 12px;
  color: white;
  border-radius: 5px;
  margin-top: 5px;
}

.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
}

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
.error-feedback {
  color: red;
}

.form input {
}
</style>
