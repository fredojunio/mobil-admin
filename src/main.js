import { createApp } from "vue";
import router from "./router/index";
import "./style.css";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.mixin({
  methods: {
    checkLogin: function () {
      if (!localStorage["access_token"]) {
        router.push("/");
      }
    },
    formatDate(dateString) {
      if (dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}/${month}/${day}`;
      } else {
        return "-";
      }
    },
    formatTime(dateString) {
      if (dateString) {
        const date = new Date(dateString);

        // const hours = String(date.getHours()).padStart(2, "0");
        // const minutes = String(date.getMinutes()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        const formattedTime = `${hours}:${minutes}`;

        return `${formattedTime}`;
      } else {
        return "-";
      }
    },
    formatNumber(value) {
      if (value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      } else {
        return "-";
      }
    },
    getCurrentTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    },
    checkSixPm() {
      const now = new Date();
      const hour = now.getHours();
      if (hour > 18 || (hour === 18 && minute >= 30) || hour <= 4) {
        this.isSixPm = true;
      }
    },
  },
  data() {
    return {
      role_id: localStorage["role_id"],
      currentTime: null,
      isSixPm: false,
    };
  },
});
console.log(import.meta.env.VITE_API_URL);
app.config.globalProperties.url = import.meta.env.VITE_API_URL;
app.mount("#app");
