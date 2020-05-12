<template>
  <div class="chat">
    <div class="conversation-container">
      <div class="conversation" v-chat-scroll>
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="message"
          :class="{'bubble': true, 'my': isMyMessage(message)}"
        >
          <span class="name">
            {{isMyMessage(message) ? "Yo" : message.name}}
            <span
              v-show="message.role === 'MODERADOR'"
              class="moderador"
              title="Moderador"
            ></span>
          </span>
          <span class="text">{{message.text}}</span>
        </div>
      </div>
      <form class="text-box" @submit.prevent="sendNewMessage">
        <input type="text" v-model="text" />
        <button type="submit">Enviar</button>
      </form>
    </div>
    <div class="description">
      <div>
        Bienvenido {{user.name}}
        <button @click="closeSession">Cerrar sesión</button>
      </div>

      <video width="320" height="240" controls>
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      text: ""
    };
  },
  created() {
    this.loadRooms();
  },
  computed: {
    ...mapState(["messages", "user"])
  },
  methods: {
    ...mapActions(["closeSession", "loadRooms", "sendMessage"]),
    isMyMessage(message) {
      return message.user === this.user.user;
    },
    sendNewMessage() {
      if (this.text.trim().length !== 0) {
        this.sendMessage({ text: this.text });
        this.text = "";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$content-background-color: #ffffff;
$primary-background-color: #04436a;
$primary-font-color: #444444;
$primary-action-color: #1d74f5;
$secondary-background-color: #f4f4f4;
$secondary-font-color: #a0a0a0;
$secondary-action-color: #dddddd;
$component-color: #f2f3f5;
$success-color: #4dff4d;
$pending-color: #fcb316;
$error-color: #bc2031;
$selection-color: #02acec;
$attention-color: #9c27b0;

* {
  font-family: sans-serif;
  font-size: 16px;
}

.chat {
  display: flex;
  align-items: flex-start;
}

.description {
  box-shadow: 0 4px #40a9ff inset;
  box-sizing: border-box;
  padding: 1em;
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  button {
    background: $primary-background-color;
    color: white;
    border-radius: 2px;
    border: 0;
    cursor: pointer;
  }
  video {
    margin-top: 10px;
    width: 500px;
    background: black;
  }
}
.conversation-container {
  position: relative;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
}

.conversation {
  display: flex;
  flex: 1 auto;
  width: 320px;
  flex-direction: column;
  padding: 0 1em;
  padding-top: 1em;
  height: auto;
  overflow: auto;
}

.text-box {
  display: flex;
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  height: 50px;
  width: 100%;
  button {
    cursor: pointer;
  }
  input {
    flex: 1 auto;
  }
}
.bubble {
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: $secondary-font-color;
  padding: 4px;
  border-radius: 4px;
  background: $content-background-color;
  .name {
    font-size: 0.6em;
    color: $primary-font-color;
    font-weight: bold;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
  .moderador {
    display: block;
    width: 8px;
    height: 8px;
    background: $selection-color;
    border-radius: 50%;
    margin-right: 4px;
  }
  &.my {
    .name {
      color: $pending-color;
    }
  }
}
</style>
