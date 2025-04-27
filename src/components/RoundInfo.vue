<template>
    <h2>Round {{ currentRound }} ({{ statusDeckLength }} cards remaining)</h2>
    <h2> Current bids </h2>
    {{  bids.length > 0 ? bids : 'There are yet to be any bids.'}}
  </template>
  
  <script>
  export default {
    props: {
      currentRound: Number,
      statusDeckLength: Number,
      bids: Object,
    },
  };
  </script>