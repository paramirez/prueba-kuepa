<template>
  <div class="view">
    <div v-if="loginForm" @click="changeForm" class="toggleform">Nuevo usuario</div>
    <div v-else @click="changeForm" class="toggleform">Iniciar sesión</div>
    <div v-show="message">{{message}}</div>
    <LoginForm v-if="loginForm" />
    <RegisterForm @usuariocreado="usuariocreado" v-else />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "Login",
  data() {
    return {
      loginForm: true,
      message: ""
    };
  },
  components: {
    LoginForm,
    RegisterForm
  },
  methods: {
    changeForm() {
      this.loginForm = !this.loginForm;
      this.message = "";
    },
    usuariocreado() {
      this.loginForm = true;
      this.message = "Su usuario fue creado con éxito";
    }
  }
};
</script>

<style lang="scss" scoped>
.view {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1 auto;
  display: flex;
  padding: 2em;
  box-shadow: 0 4px #40a9ff inset;

  @media (min-width: 1024px) {
    padding-right: 4em;
  }
}

.toggleform {
  border: 0;
  background: white;
  cursor: pointer;
  margin-bottom: 2em;
  padding: 1em;
  border: 1px solid lightgray;
  user-select: none;
  :hover {
    background: lightgray;
  }
}
</style>