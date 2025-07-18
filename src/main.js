import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "../public/assets/css/styles.css";

createApp(App).use(router).mount("#app");
