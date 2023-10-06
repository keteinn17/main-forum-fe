<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- <div class="custom-header">
    <div class="custom-style">All posts</div>
    <div class="custom-style">Find posts</div>
  </div> -->
  <div class="custom-container">
    <div class="custom-sidebar">
      <div
        class="category"
        v-for="category in categories"
        :key="category.categoryId"
      >
        <h3 class="custom-sidebar-heading">{{ category.name }}</h3>
        <div
          class="data-post"
          v-for="topic in topicsInCategory"
          :key="topic.topicId"
        >
          <div v-if="topic.categoryId === category.categoryId">
            <div
              class="column-in-topic"
              v-for="(topicLittle, index) in topic.topic"
              :key="index"
            >
              <div class="centered-icon">
                <i class="bx bx-message-rounded-minus"></i>
              </div>
              <router-link
                class="centered-title"
                :to="{
                  name: 'topic',
                  params: {
                    topicId: topicLittle.topicId,
                    topicTitle: topicLittle.titleNonDiacritics,
                  },
                }"
              >
                {{ topicLittle.title }}
              </router-link>
              <div class="topic-info">
                <div class="number-threads">
                  <div class="number-threads-content">Threads</div>
                  <div class="number">{{ topicLittle.numberOfThreads }}</div>
                </div>
                <div class="number-message">
                  <div class="number-threads-content">Message</div>
                  <div class="number">{{ topicLittle.numberOfComments }}</div>
                </div>
              </div>
              <div class="latest-thread-in-topic">
                <div
                  v-for="thread in latestThreadInTopic"
                  :key="thread.threadsId"
                >
                  <div
                    class="latest-thread-in-topic-title"
                    v-if="thread.topicId === topicLittle.topicId"
                  >
                    <router-link
                      class="threads-link-latest-in-topic"
                      :to="{
                        name: 'threads',
                        params: {
                          threadTitle: thread.titleNonDiacritics,
                          threadId: thread.threadsId,
                        },
                      }"
                    >
                      {{ thread.title }}
                    </router-link>
                    <div class="user-time-created">
                      {{ formatDateTime(thread.createAt) }} .
                      {{ thread.username }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-bar">
      <div class="custom-latest-posts">
        <h3 class="custom-latest-posts-heading">Latest posts</h3>
        <div class="custom-lastest-posts-body">
          <div
            class="custom-latest-posts-body-content"
            v-for="thread in latestThread"
            :key="thread.threadsId"
          >
            <router-link
              class="threads-link"
              :to="{
                name: 'threads',
                params: {
                  threadTitle: thread.titleNonDiacritics,
                  threadId: thread.threadsId,
                },
              }"
            >
              {{ thread.title }}
            </router-link>
            <div class="user-time-created">
              Latest: {{ thread.username }} .
              {{ formatDateTime(thread.createAt) }}
            </div>
            <router-link
              class="topic-link"
              :to="{
                name: 'topic',
                params: {
                  topicId: thread.topicId,
                  topicTitle: thread.topicTitleNonDiacritics,
                },
              }"
            >
              {{ thread.topicTitle }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="forum-statistic"></div>
    </div>
  </div>
</template>

<script>
import { getAllcategory } from "@/api/categoryApi";
import { getAllTopic } from "@/api/topicApi";
import { getlatestThread, getlatestThreadInTopic } from "@/api/threadsApi";
// eslint-disable-next-line no-unused-vars
import { loginByGoogle } from "@/api/userApi";
import Topic from "./Topic.vue";
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Topic,
  },
  data() {
    return {
      googleAccessToken: "",
      categories: [],
      categoryId: [], // Your posts data
      topics: [],
      topicsInCategory: [],
      latestThread: [],
      latestThreadInTopic: [], // Your latest posts data
      users: {}, // Your users data
      limitInc: 0, // Your limit increment value
      limit: 5, // Your limit value
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.getLatestThread();
    this.getlatestThreadInTopic();
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
      console.log(123);
    }
    getAllcategory().then(
      (response) => {
        this.categories = response.data;
        this.categories.forEach((category) => {
          this.categoryId.push(category.categoryId);
        });
        console.log(this.categoryId);
      },
      (error) => {
        console.log(error);
      }
    );
    this.getAllTopic();
  },

  methods: {
    setLimitInc(value) {
      this.limitInc = value;
    },
    formatDate(date) {
      console.log(date);
    },
    redirect(userId) {
      console.log(userId);
    },
    async getAllTopic() {
      await getAllTopic().then(
        (response) => {
          this.topics = response.data;
          console.log(this.topics);
          this.categoryId.forEach((categoryId) => {
            const topicList = [];
            this.topics.forEach((topic) => {
              if (topic.categoryId === categoryId) {
                topicList.push(topic);
              }
            });
            this.topicsInCategory.push({
              categoryId: categoryId,
              topic: topicList,
            });
            console.log(this.topicsInCategory);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getLatestThread() {
      await getlatestThread().then(
        (res) => {
          this.latestThread = res.data;
          console.log(this.latestThread);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async getlatestThreadInTopic(topicId) {
      await getlatestThreadInTopic(topicId).then(
        (res) => {
          this.latestThreadInTopic = res.data;
          console.log(this.latestThreadInTopic);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    formatDateTime(dateTimeString) {
      const dateTime = new Date(dateTimeString);
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      const today = new Date();
      var formatDateTime = "";
      const timeOptions = {
        hour: "numeric",
        minute: "numeric",
      };
      const timeString = dateTime.toLocaleTimeString("en-US", timeOptions);
      if (dateTime.toDateString() === today.toDateString()) {
        formatDateTime = `Today at ${timeString}`;
      } else {
        formatDateTime =
          dateTime.toLocaleString("en-US", options) + ` at ${timeString}`;
      }
      return formatDateTime;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Be+Vietnam+Pro");
.custom-header {
  align-items: center;
  height: 33px;
  background-color: #e2e3e5;
  font-size: 15px;
  color: #23497c;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  display: flex;
  margin-top: 4rem;
}
.custom-style {
  display: inline-grid;
  align-items: center;
  height: 33px;
  background-color: #e2e3e5;
  font-size: 15px;
  color: #23497c;
  padding-left: 16px;
  padding-right: 16px;
  margin-left: 1rem;
}

.custom-container {
  display: flex;
  padding: 10px 0 24px 16px;
  gap: 16px;
  font-family: "Be Vietnam Pro", sans-serif;
  background-color: #343a40 !important;
}

.custom-sidebar {
  flex: 3;
  height: fit-content;
  /* background-color: #5c7099; */
  flex-direction: column;
  justify-content: space-around;
}

.custom-sidebar-heading {
  color: #ebeced;
  font-size: 21px;
  font-weight: medium;
  background-color: #5c7099;
  border: 2px;
  /* border-radius: 5px; */
  display: flex;
  min-height: 3rem;
  margin-bottom: 0;
  text-align: left;
  justify-items: center;
  align-items: center;
  padding-left: 10px;
}

.custom-sidebar-list {
  background-color: #ebeced;
}

.custom-post-item {
  width: 190px;
  max-width: 500px;
  min-width: 800px;
  color: #5c7099;
  font-weight: medium;
  cursor: pointer;
}

.custom-load-more-btn {
  width: 100%;
  background-color: #5c7099;
  color: #ffffff;
  padding: 4px 12px;
}

.custom-latest-posts {
  color: #ebeced;
  font-size: 21px;
  font-weight: medium;
  background-color: #ebeced;
  padding: 6px 10px;
  margin-right: 1rem;
  height: 100%;
  min-height: 200px;
  border-radius: 10px;
  max-width: 20rem;
}

.right-bar {
  flex: 1;
  color: #ebeced;
  font-size: 21px;
  font-weight: medium;
  /* background-color: #ebeced; */
  padding: 6px 10px;
  margin-right: 1rem;
  height: 100%;
  min-height: 200px;
}

.custom-latest-posts-heading {
  color: #5c7099;
  font-weight: medium;
  /* padding: 10px; */
  font-size: 1rem;
  max-height: 3rem;
}
h3 .custom-latest-posts-heading {
  font-size: 1rem;
}

.custom-latest-post-item {
  width: 190px;
  max-width: 500px;
  min-width: 315px;
  color: #5c7099;
  font-weight: medium;
  cursor: pointer;
}
.data-post {
  background-color: #e2e3e5;
  height: 100%;
  width: 100%;
  margin-top: 0px;
}
.category {
  margin-bottom: 1rem;
}
.column-in-topic {
  height: auto;
  min-height: 3rem;
  text-align: center;
  border-bottom: 1px solid #5c7099;
  align-content: center;
  display: flex;
}
.centered-title {
  margin-left: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #23497c;
  font-weight: 600;
  min-width: 50%;
  max-width: 50%;
}

.centered-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  color: #ffba8c;
  margin-left: 5px;
  font-weight: 600;
}

.centered-title:hover {
  color: #ff6d25;
  font-weight: 600;
}

.bx {
  font-size: 24px;
  text-align: center;
}

.custom-lastest-posts-body {
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 200px;
}

.custom-latest-posts-body-content {
  min-width: 3rem;
  height: auto;
  min-height: 3rem;
  color: #343a40;
  /* max-height: 5rem; */
  text-align: left;
  font-size: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.topic-info {
  width: 20%;
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
}

.number-threads {
  min-height: 3rem;
  width: 50%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.number-threads-content {
  font-size: 12.8px;
  color: #8f9193;
}

.number-message {
  min-height: 3rem;
  width: 50%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.number {
  font-size: 16px;
}

.threads-link {
  font-size: 16px;
  max-width: 100%;
}
.threads-link:hover {
  color: #ff6d25;
  font-weight: 600;
}

.topic-link {
  font-size: 14px;
  color: #8f9193;
}
.topic-link:hover {
  text-decoration: solid;
}

.user-time-created {
  max-width: 80%;
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 14px;
  color: #8f9193;
}

.latest-thread-in-topic {
  width: 100%;
  height: auto;
  margin-left: 15px;
  max-width: 15rem;
}

.forum-statistic {
  height: 200px;
  width: 100%;
  background: #23497c;
  padding: 6px 10px;
  margin-right: 1rem;
}

.latest-thread-in-topic-title {
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.threads-link-latest-in-topic {
  font-size: 14px;
  max-width: 100%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Add any other CSS classes here with their respective styles */
</style>
