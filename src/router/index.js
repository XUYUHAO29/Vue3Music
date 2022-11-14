import { createRouter, createWebHashHistory } from "vue-router";
import songlists from "../views/songlists"
import Layout from "../layout";
const router = createRouter({
  routes: [
    {
      path: "/",
      component: Layout,
      children:[
        {
          path:"/",
          name:songlists,
          component: songlists
        }
      ]
    }
  ],
  history: createWebHashHistory()
});
export default router;
