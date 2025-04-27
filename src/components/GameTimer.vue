<template>
    <h2>{{ currentTimer }}/{{deadline}} Prestige cards have appeared</h2>
  </template>
  
  <script>
  export default {
    props: {
      currentTimer: Number,
      deadline: Number,
    },
  };
  </script>