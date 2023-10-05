<template>
  <div class="body-container"></div>
</template>

<script>
export default {
  name: "PostThreads",
  data() {
    return {
      threadsInfo: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    console.log("Thread vue");
    this.getThreadsParam();
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  methods: {
    getThreadsParam() {
      this.threadsInfo = this.$route.params;
      console.log(this.threadsInfo);
    },
  },
};
</script>

<style scoped>
.body-container {
  height: 100%;
  width: 100%;
  background: white;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
