import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "./plugins/font-awesome";
import vue3GoogleLogin from "vue3-google-login";

createApp(App)
  .use(router)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(vue3GoogleLogin, {
    clientId:
      "965745689273-7a7tccdcjn76j0pbugv0ir6bblskc31g.apps.googleusercontent.com",
  })
  .mount("#app");
