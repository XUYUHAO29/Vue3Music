import VASingleSongList from "../components/VASingleSongList.vue";
import VAGridDisplay from "../components/VAGridDisplay.vue"
export default {
  install(app) {
    app.component("va-single-songList", VASingleSongList);
    app.component("va-grid-display", VAGridDisplay)
  }
};
