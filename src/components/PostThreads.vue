<template>
  <div class="body-container">
    <div class="body-title">Post thread</div>
    <div class="body-main">
      <div class="body-main-title">
        <input
          type="text"
          class="body-main-title-input"
          placeholder="Thread title"
          v-model="threadsRequest.title"
        />
      </div>
      <div class="body-main-content-container">
        <div class="body-main-content">
          <div class="body-main-content-type"></div>
          <ContentEditor v-model="threadsRequest.content" />
        </div>
      </div>
      <div class="body-main-content-button">
        <button class="post-thread-btn" @click="createThreads">
          <i class="bx bxs-edit"></i>Post threads
        </button>
        <button class="cancel-thread-btn" @click="cancelCreateThread">
          <i class="bx bxs-trash-alt"></i>Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
//import { createThreads } from "@/api/threadsApi";
import ContentEditor from "./ContentEditor.vue";
import { toast } from "vue3-toastify";
import { createThreads } from "@/api/threadsApi";
export default {
  name: "PostThreads",
  components: {
    ContentEditor,
  },
  created() {
    console.log("Topic: ", this.$route.params);
    this.getTopicParam();
  },
  data() {
    return {
      topicParam: "",
      threadsRequest: {
        title: "",
        content: "",
      },
      errorMessage: "",
    };
  },
  watch: {
    threadsRequest: {
      handler(newVal, oldVal) {
        console.log(newVal);
        console.log(oldVal);
      },
      deep: true,
    },
  },
  methods: {
    showErrorToast(message) {
      console.log("Da vao den day");
      toast.error(message, {
        autoClose: 1000,
      });
      console.log("Da xong");
    },
    showSuccessToast(message) {
      console.log("Da vao den day");
      toast.success(message, {
        autoClose: 1000,
      });
      console.log("Da xong");
    },
    showInfoToast(message) {
      console.log("Da vao den day");
      toast.info(message, {
        autoClose: 1000,
      });
      console.log("Da xong");
    },
    setErrorMessage() {
      this.errorMessage = false;
    },
    getTopicParam() {
      this.topicParam = this.$route.params;
      console.log(this.topicParam);
    },
    async createThreads() {
      if (!this.checkThreadsRequest()) {
        return;
      }
      const topicId = this.topicParam.topicId;
      await createThreads(topicId, this.threadsRequest).then(
        (res) => {
          console.log(res);
          this.showSuccessToast("Your thread has been post");
        },
        (error) => {
          this.loadingJWT = false;
          this.errorMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.showErrorToast(this.errorMessage);
        }
      );
    },

    cancelCreateThread() {
      this.threadsRequest.content = "";
      this.threadsRequest.title = "";
    },

    checkThreadsRequest() {
      this.errorMessage = "";
      if (
        this.threadsRequest.content === "" ||
        this.threadsRequest.title == ""
      ) {
        this.showInfoToast("Title or content cannot be empty");
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
.body-container {
  height: auto;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  min-height: 800px;
}
.body-title {
  width: 100%;
  height: 3rem;
  color: white;
  text-align: left;
  padding-top: 10px;
  font-size: 30px;
}
.body-main {
  width: 100%;
  height: 100%;
  min-height: 600px;
  background: #ebeced;
  margin-top: 20px;
  border-radius: 4px;
}

.body-main-title {
  width: 100%;
  height: auto;
  min-height: 5rem;
  color: #e5eaf0;
}
.body-main-title-input {
  width: 95%;
  height: 100%;
  padding: 10px 5px;
  margin-top: 15px;
  border: 1px solid #b5b9bd;
  border-radius: 4px;
  outline: none;
  background: #e5eaf0;
}
.body-main-content-container {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  justify-items: center;
}

.body-main-content {
  width: 95%;
  height: auto;
}

.body-main-content-type {
  width: 100%;
  height: 4rem;
  background: turquoise;
  margin-bottom: 15px;
}

.body-main-content-button {
  margin-top: 20px;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  justify-items: center;
}

.post-thread-btn {
  background: #5d6d96;
  border: none;
  width: 127px;
  height: 33px;
  color: #fffdf5;
  border-radius: 5px;
}
.cancel-thread-btn {
  border: none;
  width: 127px;
  height: 33px;
  color: #fffdf5;
  border-radius: 5px;
  background: gray;
}

.btn + .btn {
  margin-left: 10px;
}
</style>
