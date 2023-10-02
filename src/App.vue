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
        <div class="custom">
          <li class="nav-item">
            <router-link to="/home" class="link">
              <font-awesome-icon icon="home" /> Home
            </router-link>
          </li>
          <li v-if="showAdminBoard" class="nav-item">
            <router-link to="/admin" class="link">Admin Board</router-link>
          </li>
          <li v-if="showModeratorBoard" class="nav-item">
            <router-link to="/mod" class="link">Moderator Board</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="currentUser" to="/user" class="link"
              >User</router-link
            >
          </li>
        </div>
        <li class="nav-item">
          <router-link to="/profile" class="link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>
    <!-- <div v-if="currentUser" class="custom-navbar-after-login"></div> -->
    <div class="body">
      <router-view />
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
.custom-navbar-login-header {
  display: flex;
}
.container {
  height: 90%;
  width: 100%;
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
.custom {
  display: flex;
}
.custom-navbar-after-login {
  background-color: #e2e3e5;
  width: 100%;
  height: 1rem;
  margin-top: 2rem;
}
.body {
  width: 100%;
  height: auto;
  margin-top: 4rem;
  position: relative;
}
</style>
