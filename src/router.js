import { createWebHistory, createRouter } from "vue-router";

import Login from "./components/Login.vue";
import Profile from "./components/Profile.vue";
import Register from "./components/Register";
import Home from "./components/Home";
import Topic from "./components/Topic";
import Threads from "./components/Threads";
import PostThreads from "./components/PostThreads";
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/topic/:topicTitle.:topicId",
    name: "topic",
    component: Topic,
    props: true,
  },
  {
    path: "/threads/:threadTitle.:threadId",
    name: "threads",
    component: Threads,
  },
  {
    path: "/:topicTitle.:topicId/post-threads",
    name: "postThreads",
    component: PostThreads,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ["/login"];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem("user");

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next("/start");
//   } else {
//     next();
//   }
// });

export default router;
