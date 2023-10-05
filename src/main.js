import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "./plugins/font-awesome";
import vue3GoogleLogin from "vue3-google-login";
import "mosha-vue-toastify/dist/style.css";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";
//import { CKEditorComponentData } from "@ckeditor/ckeditor5-vue/dist/ckeditor";
import CKEditor from "@ckeditor/ckeditor5-vue";
createApp(App)
  .use(vue3GoogleLogin, {
    clientId:
      "965745689273-7a7tccdcjn76j0pbugv0ir6bblskc31g.apps.googleusercontent.com",
  })
  .use(router)
  .use(store)
  .use(Vue3Toasity)
  .use(CKEditor)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
