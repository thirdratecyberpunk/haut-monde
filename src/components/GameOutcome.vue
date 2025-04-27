<template>
    <div id="winner">
      <p>{{ gameover }}</p>
      <p>{{ gameover.winner !== undefined ? `Winner: ${gameover.winner}` : 'Draw!' }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      gameover: Object,
    },
  };
  </script>