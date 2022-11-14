import { defineStore } from "pinia";
import api from "@/utils/api_method";
export const useLogIn = defineStore("login", {
    state: () => ({
        Cookie:""
    }),
    getters: {
    },
    actions: {
      async LogIn_async(payload) {
        let response;
        response = await api.get("/login/cellphone", payload);
        this.Cookie = response.data
      }
    }
  });