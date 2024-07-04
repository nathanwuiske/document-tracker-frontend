import { router } from "./router";
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

createApp(App)
  .use(router)
  .use(VueQueryPlugin)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: ".my-app-dark",
      },
    },
  })
  .mount("#app");
