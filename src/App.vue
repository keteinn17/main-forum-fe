<template>
  <div id="app">
    <nav class="navbar bg-dark">
      <a href="/" class="link">KietnhForum</a>

      <div v-if="!currentUser" class="custom-navbar-login-header">
        <li class="nav-item">
          <router-link to="/register" class="link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="custom-navbar-login-header">
        <div class="home-page-icon">
          <router-link to="/home" class="link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </div>
        <div class="user-page-icon">
          <router-link v-if="currentUser" to="/profile" class="link"
            ><font-awesome-icon icon="user" /> User</router-link
          >
        </div>
        <div class="user-page-icon">
          <a class="link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </div>
      </div>
    </nav>
    <div v-if="currentUser" class="navbar-in-forum-container">
      <nav class="navbar-in-forum"></nav>
    </div>
    <div class="body-container">
      <div class="body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  computed: {
    currentUser() {
      // console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
#app {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: scroll;
}
/* .custom-navbar-login-header .header {
  color: #e2e3e5;
  display: flex;
  justify-content: space-around;
} */

.custom-navbar-login-header {
  display: flex;
  justify-content: space-between;
}
.bg-dark {
  position: fixed;
}
.navbar {
  width: 100%;
  height: 4rem;
}
.link {
  color: aliceblue;
}
.link:hover {
  color: red;
}

.body-container {
  width: 100%;
  /* height: 100%; */
  /* margin-top: 4rem; */
  background: #343a40 !important;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.body {
  /* width: 60%; */
  min-height: 1000px;
  margin-top: 7rem;
  margin-left: 15%;
  margin-right: 15%;
}
.navbar-in-forum-container {
  width: 100%;
  height: 3rem;
  background: #e2e3e5 !important;
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
}
.navbar-in-forum {
  width: 80%;
  height: 60%;
  align-items: center;
  background: #e2e3e5;
  padding-left: 16px;
  padding-right: 16px;
}
.Toastify {
  position: fixed;
}
@media (max-width: 1000px) {
  .body {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
  }
}
</style>
