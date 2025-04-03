<script setup>
import { computed } from "vue";
import { tttclient } from './game/client.js'
import BoardComponent from './components/BoardComponent.vue';

const client = tttclient;

console.log(client);

const cells = computed(() => client.state.G.cells);

const culcCellId = (row, col) => (row - 1) * 3 + col - 1;

const resultMsg = computed(() => {
  const isGameOver = client.state.ctx.gameover;
  if (isGameOver) {
    return isGameOver.winner !== undefined ? `Winner: ${isGameOver.winner}` : "Draw";
  } else {
    return "";
  }
});
</script>

<template>
  <h1> Haute Monde </h1>
  <h2> {{  client.state }}</h2>
  <BoardComponent :ctx="client.state.ctx" :G="client.state.G" :moves="client.client.moves" />
  <p>{{ resultMsg }}</p>
</template>

<style>
.cell {
  border: 1px solid #555;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
</style>
