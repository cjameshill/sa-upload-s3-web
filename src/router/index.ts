import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UploadWithProgressView from "../views/UploadWithProgressView.vue";
import UploadWithAxiosView from "../views/UploadWithAxiosView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/upload-with-progress",
      name: "upload-with-progress",
      component: UploadWithProgressView,
    },
    {
      path: "/upload-with-axios",
      name: "upload-with-axios",
      component: UploadWithAxiosView,
    },
  ],
});

export default router;
