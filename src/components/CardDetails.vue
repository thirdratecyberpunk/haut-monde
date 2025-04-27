<template>
      <h2 v-if="statusCard.isPositive">Bidding to TAKE card</h2>
      <h2 v-else>Bidding to NOT take card</h2>
      <h2>Current card</h2>
      {{  statusCard }}
</template>
<script>
  export default {
    props: {
      statusCard: Object
    },
  };
</script>