<template>
  <div class="container-header">My profile</div>
  <div class="profile-content-header">
    <router-link to="/" class="forum">Forums</router-link>
    <span class="forum">&gt;</span>
    <span class="forum">Profile</span>
  </div>
  <div class="p-body-header">
    <div class="p-title">
      <h1 class="p-title-value">Account detail</h1>
    </div>
  </div>
  <div class="profile-content">
    <div class="profile-info">
      <div class="block-container">
        <h3 class="block-header">Your account</h3>
        <div class="block-body">
          <div class="block-link">
            <button style="border: none" @click="handleShowProfile">
              Your profile
            </button>
            <button style="border: none" @click="handleShowAlert">Alert</button>
            <button style="border: none" @click="handleShowSetting">
              Setting
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="tab-pane fade active show body-content" id="account-general">
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
          />
        </div>
        <div class="form-group">
          <label class="form-label">Name</label>
          <input type="text" class="form-control" value="Nelle Maxwell" />
        </div>
        <div class="form-group">
          <label class="form-label">E-mail</label>
          <input
            type="text"
            class="form-control mb-1"
            value="nmaxwell@mail.com"
          />
        </div>
        <div class="form-group">
          <label class="form-label">Company</label>
          <input type="text" class="form-control" value="Company Ltd." />
        </div>
      </div>
    </div>
    <!-- <div class="p-body-content">
      <div class="content" v-if="showProfile">
        <div class="avatar-row">
          <div class="avatar-background">
            <img
              class="avatar"
              src="https://upload.wikimedia.org/wikipedia/vi/thumb/c/c7/Logo_Real_Madrid.svg/1200px-Logo_Real_Madrid.svg.png"
              alt="avatar"
            />
          </div>
          <button class="change-avatar-button">Change avatar</button>
        </div>
        <div class="email-row"></div>
        <table v-if="user">
          <tbody>
            <tr class="username-col">
              <td class="col1">Username:</td>
              <td class="col2-username">
                <div>{{ user.username }}</div>
                <div><button>Change username</button></div>
              </td>
            </tr>
            <tr>
              <td class="col1">Email:</td>
              <td class="col2">{{ user.email }}</td>
            </tr>
            <tr>
              <td class="col1">Avatar:</td>
              <td class="col2">{{ user.avatar }}</td>
            </tr>
            <tr>
              <td class="col1">Full name:</td>
              <td class="col2">{{ user.firstName }} {{ user.lastName }}</td>
            </tr>
            <tr>
              <td class="col1">Date of birth:</td>
              <td class="col2">{{ user.dateOfBirth }}</td>
            </tr>
            <tr>
              <td class="col1">Gender:</td>
              <td class="col2">
                <font-awesome-icon icon="male" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else-if="showSetting" class="show-setting">Show setting</div>
    </div> -->
  </div>
  <ProfileForm
    v-if="toggleEditProfile"
    :setToggleEditProfile="setToggleEditProfile"
  />
  <CreatePostForm
    v-if="toggleCreatePost"
    :setToggleCreatePost="setToggleCreatePost"
    titleForm="Create New Post"
  />
</template>

<script>
//import axios from "axios";
import { getUserInfo } from "@/api/userApi";

export default {
  name: "ProfileVue",
  data() {
    return {
      user: {},
      showProfile: false,
      showAlert: false,
      showSetting: false,
    };
  },

  computed: {
    currentUser() {
      console.log(localStorage);
      return this.$store.state.auth.user;
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
  methods: {
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
        this.user.createAt = formattedDate;
        console.log(this.user);
      });
    },
    handleShowProfile() {
      this.showProfile = true;
    },
    handleShowAlert() {
      this.showAlert = true;
    },
    handleShowSetting() {
      this.showProfile = false;
      this.showSetting = true;
    },
  },
};
</script>

<style scoped>
.container-header {
  display: flex;
  align-items: center;
  height: 33px;
  background-color: #e2e3e5;
  font-size: 15px;
  color: #23497c;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 4rem;
}

.profile-navigation {
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 12px;
  color: #dce1e4;
  font-size: 16px;
  font-weight: 500;
}

.profile-navigation span {
  margin: 0 2px;
}

.profile-content {
  display: flex;
  padding-left: 16px;
  padding-right: 34.5px;
  padding-top: 10px;
  padding-bottom: 24px;
  gap: 16px;
  background-color: #343a40;
  height: auto;
}
.profile-content-header {
  display: flex;
  padding-left: 16px;
  padding-right: 34.5px;
  padding-top: 10px;
  padding-bottom: 24px;
  gap: 16px;
  background-color: #343a40;
  width: 100%;
}

.profile-info {
  flex: 1;
  margin-left: 15rem;
}

.profile-info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ebeced;
  height: fit-content;
  color: #9a919b;
  padding: 10px;
}

.profile-info h3.username {
  color: #e2e3e5;
  font-size: 28px;
  font-weight: medium;
  padding: 10px;
}

.avatar-container {
  text-align: center;
}

.label {
  position: relative;
  width: 150px;
  height: 150px;
}

.avatar-figure {
  position: relative;
  width: 150px;
  height: 150px;
}

.avatar-image {
  width: 150px;
  height: 150px;
  box-sizing: border-box;
  border-radius: 50%;
  border: 2px solid #ccc;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  cursor: pointer;
}

.avatar-caption {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: all 0.3s;
  background-color: #000;
  opacity: 0;
  cursor: pointer;
}

.camera-icon {
  display: flex;
  cursor: pointer;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: all;
  background-color: #000;
  opacity: 0;
}

.camera-icon:hover {
  background-color: #000;
  opacity: 0.4;
}

.profile-info h3.username {
  color: #5c7099;
  font-size: 28px;
  font-weight: 500;
  padding: 10px;
}

.profile-info p {
  font-size: 18px;
}

.profile-info p span {
  font-weight: bold;
}

.profile-info button {
  width: 100%;
  background-color: #5c7099;
  color: #ffffff;
  border-radius: 3px;
  padding: 3px 6px;
  margin-top: 3px;
}

.posts {
  flex: 3;
  margin-top: 4px;
}

.posts button {
  align-self: flex-end;
  background-color: #5c7099;
  color: #ffffff;
  border-radius: 3px;
  padding: 3px 6px;
  margin-bottom: 4px;
}

.posts h3 {
  color: #ebeced;
  font-size: 21px;
  font-weight: medium;
  background-color: #5c7099;
  padding: 6px 10px;
}

.create-post-button {
  align-self: flex-end;
  background-color: #5c7099;
  color: #ffffff;
  border-radius: 0.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.edit-button {
  width: 100%;
  background-color: #5c7099;
  color: #ffffff;
  border-radius: 3px;
  padding: 3px 6px;
  margin-top: 3px;
}

.posts-list-title {
  color: #ebeced;
  font-size: 21px;
  font-weight: 500;
  background-color: #5c7099;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
}
.block-container {
  color: #15191d;
  background: #ebeced;
  border-top-color: #cbcdd0;
  border-right-color: #c3c6c9;
  border-bottom-color: #b5b9bd;
  border-left-color: #c3c6c9;
  border-radius: 4px;
}

.block-header {
  padding: 6px 10px;
  margin: 0;
  font-weight: 400;
  text-decoration: none;
  font-size: 1.25rem;
  color: #ebeced;
  background: #5c7099;
  border-bottom: 1px solid #cbcdd0;
}

.join-date span {
  font-weight: bold;
}

.forum {
  color: #e2e3e5;
  margin-left: 15rem;
  margin-right: -15rem;
}

.block-link button {
  display: block;
  padding: 6px 10px;
  text-decoration: none;
  cursor: pointer;
  color: #23497c;
  text-decoration: none;
  background-color: transparent;
  border-color: #c3c6c9;
}

.p-title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  max-width: 100%;
  margin-bottom: -5px;
  background-color: #343a40;
}

.p-title-value {
  padding: 0;
  margin: 0 0 5px 0;
  font-size: 1.5rem;

  font-weight: 350;

  min-width: 0;
  margin-right: auto;
  margin-left: 15rem;
}
.p-body-header .p-title .p-title-value {
  color: #ebeced;
  background-color: #343a40;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
}

.p-body-content {
  display: table-cell;
  vertical-align: top;
  box-sizing: border-box;
  flex: 3;
  margin-top: 4px;
  background: #ebeced;
  box-sizing: border-box;
  margin-right: 15rem;
  margin-left: 2rem;
  border-radius: 5px;
}
.p-body-content[data-v-bf1681ae] {
  display: flex;
  flex-direction: row;
  margin-top: 4px;
  background: #ebeced;
  position: relative; /* Add position relative */
}

/* .p-body-content[data-v-bf1681ae]:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 30%;
  width: 1px;
  background: #000;  Set the color of the line 
} */

.p-body-pageContent > .tabs--standalone:first-child {
  margin-bottom: 10px;
}

.formRow {
  display: table;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  position: relative;
}

dl {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.formRow > dd {
  width: 67%;
  padding: 15px 10px 15px 10px;
}

.formRow > dt {
  border-right: 1px solid transparent;
  background: #e2e3e5;
  border-color: #cbcdd0;
  text-align: right;
  width: 33%;
  padding: 15px 10px 15px 10px;
}

.formRow > dd {
  width: 67%;
  padding: 15px 10px 15px 10px;
}
.label-form {
  position: absolute;
  transform: translateY(50%);
  user-select: none;
  color: black;
  pointer-events: none;
  margin-right: 10%;
}

.p-body-page-content {
  display: flex;
  justify-content: space-between;
  height: 30%;
  max-height: fit-content;
  /* margin-top: 10%; */
}

.row-content {
  height: 10%;
  /* display: flex; */
  margin-bottom: 1rem;
}

.column-1 {
  width: 30%;
}

.p-body-content-title {
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.col1 {
  width: 14rem;
}
.col2 {
  width: 21rem;
  border-left: 1px solid #23497c;
}

td.col1 {
  height: 5px;
}
td.col2 {
  height: 5rem;
}

td.col1 {
  text-align: right;
  padding-right: 2rem;
}
.body-content {
  flex: 3;
}
.col2-username {
  display: flex;
}
.avatar {
  height: 20%;
  width: 50%;
}
.avatar-row {
  width: 100%;
  height: 300px;
  border-bottom: 1px solid #9a919b;
}

.content {
  margin-top: 2rem;
  width: 100%;
  height: 300px;
}
.avatar-background {
  align-items: center;
  max-height: 300px;
  width: 300px;
  margin: auto;
}

body {
  background: #f5f5f5;
  margin-top: 20px;
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

.text-light {
  color: #babbbc !important;
}

.account-settings-fileinput {
  position: absolute;
  visibility: hidden;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.active {
  font-weight: bold !important;
}

.active {
  background: transparent !important;
}

.active {
  color: #4e5155 !important;
}

.active {
  color: #4e5155 !important;
}

.active {
  color: #fff !important;
}

.active {
  color: #4e5155 !important;
}
.form-label {
  color: #b5b9bd;
  margin-left: 0;
}

@media (max-width: 600px) {
  .profile-content {
    flex-direction: column;
  }
}
</style>
