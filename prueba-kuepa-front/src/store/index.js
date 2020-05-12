import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";
import { ChatClient } from "../services/socket";

const token = localStorage.getItem("tokenkuepa");
const API = process.env.VUE_APP_API || "http://localhost:8081";

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const chatClient = new ChatClient();
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    login: false,
    loading: false,
    messages: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.login = !!user;
    },
    loading(state) {
      state.loading = !state.loading;
    },
    addMessage(state, message) {
      state.messages = state.messages.concat(message);
    },
    reloadState(state) {
      state.loading = false;
      state.messages = [];
      state.login = false;
      state.user = null;
    },
  },
  actions: {
    async reloadSession({ commit }) {
      const token = localStorage.getItem("tokenkuepa");
      try {
        commit("loading");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(`${API}/api/auth/valid`);
        const data = response.data;
        const userDecode = JSON.parse(atob(token.split(".")[1]));
        if (data.valid) {
          commit("setUser", userDecode);
          if (
            !(
              router.history &&
              router.history.current &&
              router.history.current.name &&
              router.history.current.name === "Chat"
            )
          ) {
            router.push({ name: "Chat" });
          }
        }
        commit("loading");
      } catch (error) {
        commit("setUser", null);
        router.push("/");
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await axios.post(`${API}/api/auth/login`, credentials);
        const data = response.data;
        if (data.token) {
          localStorage.setItem("tokenkuepa", data.token);
          const userDecode = JSON.parse(atob(data.token.split(".")[1]));
          commit("setUser", userDecode);
          setTimeout(() => {
            router.push("/chat");
          }, 1000);
        }
      } catch (error) {
        return "Usuario o contraseña incorrectos";
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await axios.post(`${API}/api/user`, userData);
        const data = response.data;
        return data;
      } catch (error) {
        if (error.response) {
          return error.response.data.error;
        }
        return "Ocurrio un error inesperado";
      }
    },
    closeSession({ commit }) {
      localStorage.removeItem("tokenkuepa");
      commit("reloadState");
      router.push({ name: "Login" });
    },

    async loadRooms({ commit, state }) {
      const response = await axios.get(`${API}/api/room`);
      const data = response.data;
      const rooms = data.rooms;
      if (Array.isArray(rooms) && rooms.length) {
        const room = rooms[0]; //Se toma un unico chat como se solicita en el requerimiento
        chatClient.init(`${API}${room.namespaceName}`, state.user);
        room.history.forEach((element) => {
          commit("addMessage", element);
        });
      }
      //   console.log(data);
    },

    sendMessage({ commit, state }, content) {
      const { name, user, role } = state.user;
      chatClient.sendMessage({ name, user, role, ...content });
    },

    onNewMessage({ commit }, content) {
      commit("addMessage", content);
    },
  },
  modules: {},
});
