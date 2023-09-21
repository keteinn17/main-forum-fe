<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="custom-header">
    <div class="custom-style">All posts</div>
    <div class="custom-style">Find posts</div>
  </div>
  <div class="custom-container">
    <div class="custom-sidebar">
      <h3 class="custom-sidebar-heading">Đại sảnh</h3>
      <!-- <h3 class="custom-latest-posts-heading">Latest posts</h3>
      <ul>
        <li v-for="(post, index) in latestPost.slice(0, 5)" :key="index">
          <PostListItem
            :id="post._id"
            :img="
              users
                ? users.avatar
                : 'https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg'
            "
            :title="post.title"
            :postDate="
              timeAgo.format(
                new Date(
                  post.updatedAt === post.createdAt
                    ? post.createdAt
                    : post.updatedAt
                )
              )
            "
            :postUpdateDate="''"
            :username="user ? user.userName : 'Unknown'"
            :dateTitle="'Latest:'"
            :updateDateTitle="''"
            class="custom-latest-post-item"
            :path="user && redirect(user._id)"
          ></PostListItem>
        </li>
      </ul> -->
      <!-- <ul class="custom-sidebar-list">
        <li v-for="(post, index) in posts" :key="index">
          <PostListItem
            :id="post._id"
            :img="
              users
                ? users.avatar
                : 'https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg'
            "
            :title="post.title"
            :postDate="formatDate(post.createdAt)"
            :postUpdateDate="formatDate(post.updatedAt)"
            :username="users ? users.userName : 'Unknown'"
            :dateTitle="'Created at:'"
            :updateDateTitle="'Updated at:'"
            class="custom-post-item"
            :path="users && redirect(users._id)"
          ></PostListItem>
        </li>
        <button
          v-on:click="() => setLimitInc(limitInc + 5)"
          class="custom-load-more-btn"
          :class="{ hidden: limitInc >= limit }"
        >
          Load more
        </button>
      </ul> -->
    </div>
    <div class="custom-latest-posts">
      <h3 class="custom-latest-posts-heading">Latest posts</h3>
      <!-- <ul>
        <li v-for="(post, index) in latestPost.slice(0, 5)" :key="index">
          <PostListItem
            :id="post._id"
            :img="
              users
                ? users.avatar
                : 'https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg'
            "
            :title="post.title"
            :postDate="
              timeAgo.format(
                new Date(
                  post.updatedAt === post.createdAt
                    ? post.createdAt
                    : post.updatedAt
                )
              )
            "
            :postUpdateDate="''"
            :username="user ? user.userName : 'Unknown'"
            :dateTitle="'Latest:'"
            :updateDateTitle="''"
            class="custom-latest-post-item"
            :path="user && redirect(user._id)"
          ></PostListItem>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [], // Your posts data
      latestPost: [], // Your latest posts data
      users: {}, // Your users data
      limitInc: 0, // Your limit increment value
      limit: 5, // Your limit value
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
  },
  methods: {
    setLimitInc(value) {
      this.limitInc = value;
    },
    formatDate(date) {
      console.log(date);
      // Implement your date formatting logic here
    },
    redirect(userId) {
      console.log(userId);
      // Implement your redirect logic here
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
  background-color: #5c7099;
}

.custom-sidebar-heading {
  color: #ebeced;
  font-size: 21px;
  font-weight: medium;
  /* background-color: #5c7099; */
  padding: 6px 10px;
  border: 2px;
  border-radius: 5px;
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
}

.custom-latest-posts-heading {
  color: #5c7099;
  font-weight: medium;
  /* padding: 10px; */
  font-size: 1rem;
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

/* Add any other CSS classes here with their respective styles */
</style>
