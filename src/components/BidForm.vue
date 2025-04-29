<template>
    <form @submit.prevent="handleSubmit">
        <div v-for="(currency, index) in currentPlayerHand" :key="index">
        <input 
        type="checkbox"
        :id="'currency-' + index"
        :value="currency"
        v-model="selectedCurrencies">
        <label :for="'currency-' + index">{{ currency }}</label>
    </div>
    <button type="submit">Bid</button>
</form>
    <button @click="passMove">Pass</button>
</template>
<script>
 export default {
    props: {
        currentPlayerHand: Array,
        currentPlayer: String,
        moves: Object,
        ctx: Object
    },
 data() {
    return { selectedCurrencies: []}
 },
 watch: {
    currentPlayer(newValue, oldValue) {
      console.log(`Current player changed from ${oldValue} to ${newValue}`);
      this.selectedCurrencies = []; // Clear selections when the current player changes
    },
  },
 methods: {
    handleSubmit(){
        this.moves.bid(this.selectedCurrencies);
    },
    passMove(){
        this.moves.pass();
    }
 }
}
</script>