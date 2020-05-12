<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Inicio</router-link>|
      <router-link to="/chat">Chat</router-link>
    </div>-->
    <router-view />
    <div class="cargando" v-show="loading">Cargando</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["loading"])
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  //   border: 1px solid;
  display: flex;
  flex-direction: column;
}

.cargando {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  z-index: 200;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
