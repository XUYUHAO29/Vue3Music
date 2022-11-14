import { defineStore } from "pinia";
import api from "@/utils/api_method";
export const useSongLists = defineStore("songlists", {
  state: () => ({
    Itemlists: {},
    singleListDetail:{}
  }),
  getters: {
    getterItemlists(state){
      return state.Itemlists
    }
  },
  actions: {
    // 获取精品歌单
    async getItemlists_async(payload) {
      let response;
      response = await api.get("/top/playlist/highquality", payload);
      this.Itemlists = response.data;
      // console.log(this.Itemlists)
    },
    // 获取歌单详细歌曲
    async getDetail_async(payload){
      let response;
      response = await api.get("/playlist/track/all", payload);
      this.singleListDetail = response.data;
      console.log(response.data)
    }
  }
});
