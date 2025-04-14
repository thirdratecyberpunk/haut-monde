<template>
  <Board v-if="state" :G="state.G" :moves="client.moves" :ctx="state.ctx" />
  <p v-else>loading...</p>
</template>

<script>
import { Client } from "boardgame.io/client";
import { TicTacToe } from "./game/Game";
import Board from "./components/BoardComponent.vue";

export default {
  name: "App",
  components: { Board },
  data() {
    return { client: null, unsubscribe: null, state: null };
  },
  mounted() {
    // Run boardgame.io client on component mount.
    this.client = Client({
      game: TicTacToe,
    });
    this.client.start();
    // Set up a state subscription to update component state
    // when the boardgame.io client state updates.
    this.unsubscribe = this.client.subscribe((state) => {
      this.state = state;
    });
  },
  unmounted() {
    // When the component unmounts, clean up subscriptions
    // and stop the boardgame.io client.
    this.unsubscribe();
    this.client.stop();
    this.client = this.unsubscribe = this.state = null;
  },
};
</script>

<style>
</style>
