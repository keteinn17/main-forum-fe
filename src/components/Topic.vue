<template>
  <div class="body-container">
    <div class="header-container">
      <div class="title">{{ topic.title }}</div>
      <div class="post">
        <button class="post-btn">Post thread<i class="bx bxs-edit"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllTopicById } from "@/api/topicApi";
export default {
  name: "TopicVue",
  data() {
    return {
      topic: {},
    };
  },
  created() {
    this.getAllTopicById();
  },
  mounted() {
    console.log("Topic ID:", this.$route.params.topicId);
    // You can use the topicId in this component as needed
  },
  methods: {
    async getAllTopicById() {
      const id = this.$route.params.topicId;
      await getAllTopicById(id).then((res) => {
        console.log(res);
        this.topic = res.data;
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
  background: tan;
  box-shadow: inset;
  border: 1px solid tan;
  border-radius: 5px;
  color: white;
}

.content-container {
  width: 100%;
  height: 100px;
  margin-top: 20px;
  color: white;
}
</style>
