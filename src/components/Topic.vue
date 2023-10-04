<template>
  <div class="body-container">
    <div class="header-container">
      <div class="title">{{ topic.title }}</div>
      <div class="post">
        <button class="post-btn">Post thread<i class="bx bxs-edit"></i></button>
      </div>
    </div>
    <div class="content-container">
      <div class="content-body">
        <div class="content-header">
          <div class="bookmark-bar"></div>
          <div class="bookmark-bar2"></div>
        </div>
        <div class="content-body-container">
          <div class="block-filter-bar">
            <div class="filter-bar"></div>
          </div>
          <div class="content-body-block">
            <div
              class="content-body-block-row"
              v-for="thread in threadsList"
              :key="thread.threadsId"
            >
              {{ thread.content }}
            </div>
          </div>
        </div>
      </div>
      <div class="content-sidebar"></div>
    </div>
  </div>
</template>

<script>
import { getTopicById } from "@/api/topicApi";
import { getAllThreadsInTopic } from "@/api/threadsApi";
export default {
  name: "TopicVue",
  data() {
    return {
      topic: {},
      threadsList: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.getTopicById();
    this.getAllThreadsInTopic();
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    console.log("Topic ID:", this.$route.params.topicId);
    // You can use the topicId in this component as needed
  },
  methods: {
    async getTopicById() {
      const id = this.$route.params.topicId;
      await getTopicById(id).then((res) => {
        console.log(res);
        this.topic = res.data;
        console.log(this.topic);
      });
    },
    async getAllThreadsInTopic() {
      const id = this.$route.params.topicId;
      await getAllThreadsInTopic(id).then((res) => {
        console.log(res);
        this.threadsList = res.data;
        console.log(this.topic);
      });
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
.header-container {
  width: 100%;
  height: 3rem;
  margin-top: 10px;
  color: black;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  flex-wrap: wrap;
}

.title {
  text-align: center;
  justify-self: flex-start;
  font-size: 20px;
  color: white;
}
.header-container .post {
  text-align: center;
  justify-self: flex-end;
}

.post-btn {
  background: #ff944d;
  box-shadow: inset;
  border: 1px solid tan;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  min-width: 100px;
  padding: 7px 15px;
  box-sizing: border-box;
  outline: none;
  transition: opacity 0.3 ease;
}

.post-btn:hover {
  opacity: 0.8;
}

.content-container {
  width: 100%;
  height: auto;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}

.content-container .content-body {
  height: auto;
  flex: 3;
  margin-right: 10px;
}

.content-container .content-sidebar {
  flex: 1;
  background: violet;
}

.content-header {
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

.bookmark-bar {
  width: 100px;
  background: sienna;
}
.bookmark-bar2 {
  width: 100px;
  background: sienna;
}
.content-body-container {
  width: 100%;
  /* height: 100%; */
  background: #ebeced;
  border: 1px solid;
  border-radius: 4px;
}

.block-filter-bar {
  width: 100%;
  height: 50px;
  background: #5c7099;
  display: flex;
}
.filter-bar {
  width: 100%;
  height: 100%;
  padding: 10px;
}
.content-body-block {
  height: 100%;
}
.content-body-block-row {
  height: auto;
  min-height: 3rem;
  display: flex;
  text-align: center;
  align-items: center;
  border-bottom: 1px solid #5c7099;
}

@media (max-width: 1000px) {
  .content-body .content-sidebar {
    width: 100%;
  }
}
</style>
