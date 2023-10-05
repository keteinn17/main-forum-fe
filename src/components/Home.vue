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
        <!-- <div class="data-post" v-for="(topic, index) in topics" :key="index">
          <div v-if="topic.categoryId === category.categoryId">
            {{ topic.title }}
          </div>
        </div> -->
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="custom-latest-posts">
      <h3 class="custom-latest-posts-heading">Latest posts</h3>
    </div>
  </div>
</template>

<script>
import { getAllcategory } from "@/api/categoryApi";
import { getAllTopic } from "@/api/topicApi";
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
      latestPost: [], // Your latest posts data
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
  created() {},
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
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
      getAllTopic().then(
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
  },
};
</script>

<style scoped>
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
  padding-left: 20px;
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
  flex: 1;
  color: #ebeced;
  font-size: 21px;
  font-weight: medium;
  background-color: #ebeced;
  padding: 6px 10px;
  margin-right: 1rem;
  height: 100px;
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
  justify-content: center;
  align-items: center;
  text-align: center;
}

.centered-title:hover {
  color: #ff6d25;
  font-weight: 600;
}

/* Add any other CSS classes here with their respective styles */
</style>
