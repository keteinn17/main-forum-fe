import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "./plugins/font-awesome";

// import GAuth from "vue-google-oauth2";
// const gauthOption = {
//   clientId:
//     "965745689273-7a7tccdcjn76j0pbugv0ir6bblskc31g.apps.googleusercontent.com",
//   scope: "profile email",
//   prompt: "consent",
//   fetch_basic_profile: true,
// };
import GAuth from "vue3-google-oauth2";
const gauthOption = {
  clientId:
    "965745689273-7a7tccdcjn76j0pbugv0ir6bblskc31g.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account",
};
createApp(App)
  .use(router)
  .use(store)
  .use(GAuth, gauthOption)
  // .use(GAuth, gauthOption)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
