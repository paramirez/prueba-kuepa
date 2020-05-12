<template>
  <form @submit.prevent="validateForm" class="form">
    <input type="text" v-model="username" placeholder="Usuario" />
    <input type="password" v-model="password" placeholder="Contraseña" />
    <button type="submit">Iniciar sesión</button>
    <div v-show="error" class="error">{{error}}</div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    ...mapActions(["login"]),
    async validateForm() {
      this.error = await this.login({
        username: this.username,
        password: this.password
      });
      if (this.error) this.password = "";
    }
  }
};
</script>
<style lang="scss" scoped>
.form {
  background: white;
  display: flex;
  flex-direction: column;
}
button,
input {
  margin-top: 10px;
}
button {
  background: #3498db;
  border: 0;
  color: white;
  padding: 4px 0;
  cursor: pointer;
  transition: all 0.4s;
  &:hover {
    box-shadow: 0 -2px #2980b9 inset;
  }
}
input {
  color: #444;
  padding: 4px;
  border-radius: 2px;
  border: 0;
  border-bottom: 1px solid #3498db;
  &:focus {
    outline: none;
  }
}
.error {
  margin-top: 10px;
  color: #bc2031;
}
</style>