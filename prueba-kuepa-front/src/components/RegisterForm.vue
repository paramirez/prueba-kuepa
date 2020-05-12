<template>
  <form @submit.prevent="validateForm" class="form">
    <input type="text" v-model="name" placeholder="Nombre" />
    <input type="text" v-model="username" placeholder="Usuario" />
    <input type="password" v-model="password" placeholder="Contraseña" />
    <button type="submit">Registrar</button>
    <div v-show="error" class="error">{{error}}</div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      username: "",
      password: "",
      error: "",
      loading: false
    };
  },
  methods: {
    ...mapActions(["register"]),
    async validateForm() {
      const { name, username, password } = this;
      if (!name || !username || !password) {
        this.error = "Formulario incompleto";
        return;
      }
      this.loading = true;
      const result = await this.register({
        username: this.username,
        name: this.name,
        password: this.password
      });
      this.loading = false;
      this.name = "";
      this.password = "";
      this.username = "";
      if (typeof result === "string") {
        this.error = result;
      } else {
        this.$emit("usuariocreado");
      }
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