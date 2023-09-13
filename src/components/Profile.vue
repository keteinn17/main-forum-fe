<template>
  <div class="container-header">My profile</div>
  <div class="profile-content">
    <router-link to="/" class="forum">Forums</router-link>
    <span class="forum">&gt;</span>
    <span class="forum">Profile</span>
  </div>
  <div class="profile-content">
    <div class="profile-info">
      <div class="profile-info-container">
        <h3 class="username">Profile</h3>
        <div class="avatar-container">
          <label class="label">
            <input
              class="hidden"
              type="file"
              name="myFile"
              @change="uploadFile"
            />
            <figure class="avatar-figure">
              <img :src="user.avatar" class="avatar-image" alt="avatar" />
              <figcaption class="avatar-caption">
                <img
                  class="camera-icon"
                  src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png"
                  alt=""
                />
              </figcaption>
            </figure>
          </label>
        </div>
        <h3 class="username">{{ user.username }}</h3>
        <p>{{ user.email }}</p>
        <p>{{ user.gender }}</p>
        <p>{{ user.phone }}</p>
        <p class="join-date">
          Joined: <span>{{ user.createAt }}</span>
        </p>
        <button @click="setToggleEditProfile(true)" class="edit-button">
          Edit Information
        </button>
      </div>
    </div>
    <div class="posts">
      <button @click="setToggleCreatePost(true)" class="create-post-button">
        Create New Post
      </button>
      <h3 class="posts-list-title">All Posts List</h3>
    </div>
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
    };
  },

  computed: {
    currentUser() {
      console.log(localStorage);
      return this.$store.state.auth.user;
    },
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
        // this.user = res.data;
        this.user = res.data;
        const date = new Date(this.user.createAt);
        const formattedDate = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        this.user.createAt = formattedDate;
      });
    },
  },
};
</script>

<style scoped>
.container {
  /* display: flex;
  align-items: center;
  height: 33px;
  background-color: #343a40;
  font-size: 15px;
  color: #23497c;
  padding-left: 16px;
  padding-right: 16px; */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #343a40;
  font-size: 15px;
  color: #23497c;
  padding-left: 16px;
  padding-right: 16px;
}
.container-header {
  display: flex;
  align-items: center;
  height: 33px;
  background-color: #e2e3e5;
  font-size: 15px;
  color: #23497c;
  padding-left: 16px;
  padding-right: 16px;
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
}

.profile-info {
  flex: 1;
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

.join-date span {
  font-weight: bold;
}

.forum {
  color: #e2e3e5;
}

@media (max-width: 600px) {
  .profile-content {
    flex-direction: column;
  }
}
</style>
