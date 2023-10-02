<template>
  <body>
    <div class="container light-style flex-grow-1 container-p-y wrapper">
      <h4 class="font-weight-bold py-3 mb-4">Account settings</h4>
      <div class="card overflow-hidden">
        <div class="row no-gutters row-bordered row-border-light">
          <div class="col-md-3 pt-0">
            <div class="list-group list-group-flush account-settings-links">
              <a
                class="list-group-item list-group-item-action active"
                data-toggle="list"
                href="#account-general"
                >General</a
              >
              <a
                class="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-change-password"
                >Change password</a
              >
              <a
                class="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-info"
                >Info</a
              >
              <a
                class="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-social-links"
                >Social links</a
              >
              <a
                class="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-connections"
                >Connections</a
              >
              <a
                class="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-notifications"
                >Notifications</a
              >
            </div>
          </div>
          <div class="col-md-9">
            <div class="tab-content">
              <div class="tab-pane fade active show" id="account-general">
                <div class="card-body media align-items-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt
                    class="d-block ui-w-80"
                  />
                  <div class="media-body ml-4">
                    <label class="btn btn-outline-primary">
                      Upload new photo
                      <input type="file" class="account-settings-fileinput" />
                    </label>
                    &nbsp;
                    <button type="button" class="btn btn-default md-btn-flat">
                      Reset
                    </button>
                    <div class="text-light small mt-1">
                      Allowed JPG, GIF or PNG. Max size of 800K
                    </div>
                  </div>
                </div>
                <hr class="border-light m-0" />
                <div class="card-body">
                  <div class="form-group">
                    <label class="form-label">Username</label>
                    <input
                      type="text"
                      class="form-control mb-1"
                      v-model="user.username"
                      readonly
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">First name</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="updateProfileRequest.firstName"
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Last name</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="updateProfileRequest.lastName"
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">E-mail</label>
                    <input
                      type="text"
                      class="form-control mb-1"
                      :value="user.email"
                      :readonly="isGoogleAccount"
                    />
                    <div v-if="!isGoogleAccount">
                      <button class="change-email">Change email</button>
                    </div>
                    <!-- <div class="alert alert-warning mt-3">
                      Your email is not confirmed. Please check your inbox.<br />
                      <a href="javascript:void(0)">Resend confirmation</a>
                    </div> -->
                  </div>
                  <div class="form-group gender">
                    <label class="form-label">Gender</label>
                    <br />
                    <!-- <input
                      type="text"
                      class="form-control"
                      value="Company Ltd."
                    /> -->
                    <select v-model="updateProfileRequest.gender">
                      {{
                        user.gender
                      }}
                      <option
                        v-for="(gender, index) in genderList"
                        :key="index"
                        :value="gender"
                      >
                        {{ gender }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="save-cancel">
                  <button
                    type="button"
                    class="btn btn-primary change-pw"
                    @click="handleUpdateProfile"
                  >
                    Save changes</button
                  >&nbsp;
                  <button
                    type="button"
                    class="btn btn-default"
                    @click="onCancelUpdateProfile"
                  >
                    Cancel
                  </button>
                </div>
                <div v-if="message" class="alert alert-danger" role="alert">
                  {{ message }}
                </div>
              </div>
              <div class="tab-pane fade" id="account-change-password">
                <div class="card-body pb-2">
                  <div class="form-group">
                    <label class="form-label">Current password</label>
                    <input
                      type="password"
                      class="form-control"
                      v-model="changePasswordRequest.currentPassword"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">New password</label>
                    <input
                      type="password"
                      class="form-control"
                      v-model="changePasswordRequest.newPassword"
                      required
                      pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$"
                      title="A password contains at least eight characters, including at least one number and includes both lower and uppercase letters and special characters, for example #, ?, !."
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Confirm new password</label>
                    <input
                      type="password"
                      class="form-control"
                      v-model="changePasswordRequest.confirmNewPassword"
                      required
                    />
                  </div>
                </div>
                <div class="save-cancel">
                  <button
                    type="button"
                    class="btn btn-primary change-pw"
                    @click="handleChangePassword"
                  >
                    Save changes</button
                  >&nbsp;
                  <button
                    type="button"
                    class="btn btn-default"
                    @click="onCancelChangePassword"
                  >
                    Cancel
                  </button>
                </div>
                <div v-if="message" class="alert alert-danger" role="alert">
                  {{ message }}
                </div>
              </div>
              <div class="tab-pane fade" id="account-info">
                <div class="card-body pb-2">
                  <div class="form-group">
                    <label class="form-label">Bio</label>
                    <textarea
                      class="form-control"
                      rows="5"
                      v-model="updateProfileRequest.aboutMe"
                    >
                    </textarea>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Birthday</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="updateProfileRequest.dateOfBirth"
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Country</label>
                    <select class="custom-select">
                      <option>USA</option>
                      <option selected>Canada</option>
                      <option>UK</option>
                      <option>Germany</option>
                      <option>France</option>
                    </select>
                  </div>
                </div>
                <hr class="border-light m-0" />
                <div class="card-body pb-2">
                  <h6 class="mb-4">Contacts</h6>
                  <div class="form-group">
                    <label class="form-label">Phone</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="updateProfileRequest.phone"
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Website</label>
                    <input type="text" class="form-control" value />
                  </div>
                </div>
                <div class="save-cancel">
                  <button
                    type="button"
                    class="btn btn-primary change-pw"
                    @click="handleUpdateProfile"
                  >
                    Save changes</button
                  >&nbsp;
                  <button
                    type="button"
                    class="btn btn-default"
                    @click="onCancelUpdateProfile"
                  >
                    Cancel
                  </button>
                </div>
                <div v-if="message" class="alert alert-danger" role="alert">
                  {{ message }}
                </div>
              </div>
              <div class="tab-pane fade" id="account-social-links">
                <div class="card-body pb-2">
                  <div class="form-group">
                    <label class="form-label">Twitter</label>
                    <input
                      type="text"
                      class="form-control"
                      value="https://twitter.com/user"
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Facebook</label>
                    <input
                      type="text"
                      class="form-control"
                      value="https://www.facebook.com/user"
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Google+</label>
                    <input type="text" class="form-control" value />
                  </div>
                  <div class="form-group">
                    <label class="form-label">LinkedIn</label>
                    <input type="text" class="form-control" value />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Instagram</label>
                    <input
                      type="text"
                      class="form-control"
                      value="https://www.instagram.com/user"
                    />
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="account-connections">
                <div class="card-body">
                  <button type="button" class="btn btn-twitter">
                    Connect to <strong>Twitter</strong>
                  </button>
                </div>
                <hr class="border-light m-0" />
                <div class="card-body">
                  <h5 class="mb-2">
                    <a
                      href="javascript:void(0)"
                      class="float-right text-muted text-tiny"
                      ><i class="ion ion-md-close"></i> Remove</a
                    >
                    <i class="ion ion-logo-google text-google"></i>
                    You are connected to Google:
                  </h5>
                  <a
                    href="/cdn-cgi/l/email-protection"
                    class="__cf_email__"
                    data-cfemail="f9979498818e9c9595b994989095d79a9694"
                    >[email&#160;protected]</a
                  >
                </div>
                <hr class="border-light m-0" />
                <div class="card-body">
                  <button type="button" class="btn btn-facebook">
                    Connect to <strong>Facebook</strong>
                  </button>
                </div>
                <hr class="border-light m-0" />
                <div class="card-body">
                  <button type="button" class="btn btn-instagram">
                    Connect to <strong>Instagram</strong>
                  </button>
                </div>
              </div>
              <div class="tab-pane fade" id="account-notifications">
                <div class="card-body pb-2">
                  <h6 class="mb-4">Activity</h6>
                  <div class="form-group">
                    <label class="switcher">
                      <input type="checkbox" class="switcher-input" checked />
                      <span class="switcher-indicator">
                        <span class="switcher-yes"></span>
                        <span class="switcher-no"></span>
                      </span>
                      <span class="switcher-label"
                        >Email me when someone comments on my article</span
                      >
                    </label>
                  </div>
                  <div class="form-group">
                    <label class="switcher">
                      <input type="checkbox" class="switcher-input" checked />
                      <span class="switcher-indicator">
                        <span class="switcher-yes"></span>
                        <span class="switcher-no"></span>
                      </span>
                      <span class="switcher-label"
                        >Email me when someone answers on my forum thread</span
                      >
                    </label>
                  </div>
                  <div class="form-group">
                    <label class="switcher">
                      <input type="checkbox" class="switcher-input" />
                      <span class="switcher-indicator">
                        <span class="switcher-yes"></span>
                        <span class="switcher-no"></span>
                      </span>
                      <span class="switcher-label"
                        >Email me when someone follows me</span
                      >
                    </label>
                  </div>
                </div>
                <hr class="border-light m-0" />
                <div class="card-body pb-2">
                  <h6 class="mb-4">Application</h6>
                  <div class="form-group">
                    <label class="switcher">
                      <input type="checkbox" class="switcher-input" checked />
                      <span class="switcher-indicator">
                        <span class="switcher-yes"></span>
                        <span class="switcher-no"></span>
                      </span>
                      <span class="switcher-label">News and announcements</span>
                    </label>
                  </div>
                  <div class="form-group">
                    <label class="switcher">
                      <input type="checkbox" class="switcher-input" />
                      <span class="switcher-indicator">
                        <span class="switcher-yes"></span>
                        <span class="switcher-no"></span>
                      </span>
                      <span class="switcher-label">Weekly product updates</span>
                    </label>
                  </div>
                  <div class="form-group">
                    <label class="switcher">
                      <input type="checkbox" class="switcher-input" checked />
                      <span class="switcher-indicator">
                        <span class="switcher-yes"></span>
                        <span class="switcher-no"></span>
                      </span>
                      <span class="switcher-label">Weekly blog digest</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-right mt-3">
        <button type="button" class="btn btn-primary">Save changes</button
        >&nbsp;
        <button type="button" class="btn btn-default">Cancel</button>
      </div>
    </div>
  </body>
</template>

<script>
//import axios from "axios";
import { getUserInfo, changePassword, updateProfile } from "@/api/userApi";
import { required } from "vuelidate/lib/validators";
// eslint-disable-next-line no-unused-vars
const phoneRegex = new RegExp("(84|0[3|5|7|8|9])+([0-9]{8})");

export default {
  name: "ProfileVue",
  data() {
    return {
      user: {},
      userAdditionalInfo: {},
      genderList: ["MALE", "FEMALE", "OTHER"],
      showProfile: false,
      showAlert: false,
      showSetting: false,
      changePasswordRequest: {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      updateProfileRequest: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        phone: "",
        address: "",
        aboutMe: "",
      },
      message: "",
    };
  },
  validations: {
    updateProfileRequest: {
      firstName: { required },
      lastName: { required },
    },
  },

  computed: {
    currentUser() {
      console.log(localStorage);
      return this.$store.state.auth.user;
    },
    fullName() {
      return this.user.firstName + " " + this.user.lastName;
    },
    isGoogleAccount() {
      console.log(localStorage.getItem("account_type"));
      if (localStorage.getItem("account_type") == JSON.stringify("GOOGLE")) {
        console.log("Day la google account");
        return true;
      }
      return false;
    },
  },
  created() {
    this.getUserInfo();
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    // this.fetchProfileData();
    this.getUserInfo();
  },
  watch: {
    changePasswordRequest: {
      handler(newPw, oldPw) {
        console.log(newPw);
        console.log(oldPw);
      },
      deep: true,
    },
    updateProfileRequest: {
      handler(newPw, oldPw) {
        console.log(newPw);
        console.log(oldPw);
      },
      deep: true,
    },
  },
  methods: {
    setGenderValue(gender) {
      this.updateProfileRequest.gender = gender;
    },
    async getUserInfo() {
      await getUserInfo().then((res) => {
        console.log(res.data);
        this.user = res.data;
        const date = new Date(this.user.createAt);
        const formattedDate = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        this.userAdditionalInfo = this.user.userAdditionalInfoProfile;
        this.updateProfileRequest.firstName = this.user.firstName;
        this.updateProfileRequest.lastName = this.user.lastName;
        this.updateProfileRequest.dateOfBirth = this.user.dateOfBirth;
        this.updateProfileRequest.gender = this.user.gender;
        this.updateProfileRequest.phone = this.userAdditionalInfo.phone;
        this.updateProfileRequest.address = this.userAdditionalInfo.address;
        this.updateProfileRequest.aboutMe = this.userAdditionalInfo.aboutMe;
        this.user.createAt = formattedDate;
        console.log(this.user);
      });
    },
    checkChangePasswordRequest(event) {
      event.preventDefault();
      this.message = "";
      var passwordRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
      );

      if (!passwordRegex.test(this.changePasswordRequest.newPassword)) {
        this.showError = true;
        this.message =
          "New password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be 8-20 characters long.";
        return false;
      }

      if (
        this.changePasswordRequest.newPassword !==
        this.changePasswordRequest.confirmNewPassword
      ) {
        //this.showError = true;
        this.message = "New password and confirm new password must match.";
        return false;
      }
      this.message = "";
      return true;
    },
    async handleChangePassword() {
      var check = this.checkChangePasswordRequest(event);
      if (!check) return;
      await changePassword(this.changePasswordRequest).then(
        (res) => {
          console.log(res);
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
    async handleUpdateProfile() {
      if (!this.checkUpdateProfileRequest(event)) return;
      await updateProfile(this.updateProfileRequest).then(
        (res) => {
          this.user = res.data;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    onCancelChangePassword() {
      this.changePasswordRequest.currentPassword = "";
      this.changePasswordRequest.newPassword = "";
      this.changePasswordRequest.confirmNewPassword = "";
    },
    onCancelUpdateProfile() {
      this.userAdditionalInfo = this.user.userAdditionalInfoProfile;
      this.updateProfileRequest.firstName = this.user.firstName;
      this.updateProfileRequest.lastName = this.user.lastName;
      this.updateProfileRequest.dateOfBirth = this.user.dateOfBirth;
      this.updateProfileRequest.gender = this.user.gender;
      this.updateProfileRequest.phone = this.userAdditionalInfo.phone;
      this.updateProfileRequest.address = this.userAdditionalInfo.address;
      this.updateProfileRequest.aboutMe = this.userAdditionalInfo.aboutMe;
    },
    checkUpdateProfileRequest(event) {
      event.preventDefault();
      this.message = "";
      const phoneRegex = new RegExp("(84|0[3|5|7|8|9])+([0-9]{8})");
      if (!phoneRegex.test(this.updateProfileRequest.phone)) {
        this.showError = true;
        this.message = "Incorrect phone number";
        return false;
      }

      if (
        this.updateProfileRequest.firstName === "" ||
        this.updateProfileRequest.lastName === ""
      ) {
        //this.showError = true;
        this.message = "First name or last name cannot be empty";
        return false;
      }
      this.message = "";
      return true;
    },
  },
};
</script>

<style scoped>
@import "bootstrap/dist/css/bootstrap.min.css";
@import url("https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css");

body {
  /* background: url("https://wallpaperaccess.com/full/39639.jpg") no-repeat fixed; */
  background-size: cover;
  background-position: center;
  height: 1000px;
}
h4 {
  color: #babbbc;
}
.container {
  background: transparent;
}

.ui-w-80 {
  width: 80px !important;
  height: auto;
}

.btn-default {
  border-color: rgba(24, 28, 33, 0.1);
  background: rgba(0, 0, 0, 0);
  color: #4e5155;
}

label.btn {
  margin-bottom: 0;
}

.btn-outline-primary {
  border-color: #26b4ff;
  background: transparent;
  color: #26b4ff;
}

.btn {
  cursor: pointer;
}
.change-pw {
  margin-left: 20px;
}

.text-light {
  color: #babbbc !important;
}
.change-email:hover {
  background-color: #3b5998;
}

.btn-facebook {
  border-color: rgba(0, 0, 0, 0);
  background: #3b5998;
  color: #fff;
}

.btn-instagram {
  border-color: rgba(0, 0, 0, 0);
  background: #000;
  color: #fff;
}

.card {
  background-clip: padding-box;
  box-shadow: 0 1px 4px rgba(24, 28, 33, 0.012);
}
.overflow-hidden {
  background: transparent;
}

.row-bordered {
  overflow: hidden;
}
.gender {
  display: flex;
  flex-direction: row;
}

.account-settings-fileinput {
  position: absolute;
  visibility: hidden;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.account-settings-links .list-group-item.active {
  font-weight: bold !important;
}

html:not(.dark-style) .account-settings-links .list-group-item.active {
  background: transparent !important;
}

.account-settings-multiselect ~ .select2-container {
  width: 100% !important;
}

.light-style .account-settings-links .list-group-item {
  padding: 0.85rem 1.5rem;
  border-color: rgba(24, 28, 33, 0.03) !important;
}

.light-style .account-settings-links .list-group-item.active {
  color: #4e5155 !important;
}

.material-style .account-settings-links .list-group-item {
  padding: 0.85rem 1.5rem;
  border-color: rgba(24, 28, 33, 0.03) !important;
}

.material-style .account-settings-links .list-group-item.active {
  color: #4e5155 !important;
}

.dark-style .account-settings-links .list-group-item {
  padding: 0.85rem 1.5rem;
  border-color: rgba(255, 255, 255, 0.03) !important;
}

.dark-style .account-settings-links .list-group-item.active {
  color: #fff !important;
}

.light-style .account-settings-links .list-group-item.active {
  color: #4e5155 !important;
}

.light-style .account-settings-links .list-group-item {
  padding: 0.85rem 1.5rem;
  border-color: rgba(24, 28, 33, 0.03) !important;
}

.save-cancel {
  margin-bottom: 20px;
}
</style>
