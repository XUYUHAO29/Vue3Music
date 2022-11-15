import { createRouter, createWebHashHistory } from "vue-router";
import songlists from "../views/songlists"
import songDetail from "../views/songDetail"
import songLyric from "../views/songLyric"
import Layout from "../layout";
import { stopAnimation, continuAnimation  } from "../static/js/canvasBackground"
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
        },
        {
          path:"/songDetail",
          name:songDetail,
          component:songDetail
        },
        {
          path:"/songLyric",
          name:songLyric,
          component:songLyric
        }
      ]
    }
  ],
  history: createWebHashHistory()
});
router.beforeEach((to,from)=>{
  
  if(to.name.name == "songlyric"){
    stopAnimation()
    // console.log("stopAnimation")
  } 
  
  if(from.path == "/songLyric"){
    continuAnimation()
    // console.log("continuAnimation")
  }
})
export default router;
