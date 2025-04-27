
<template>
  <h1> Board component</h1>
    <div>
      <table id="board">
        <h2>Round {{  G.current_round }} ({{ G.status_deck.length }} cards remaining)</h2>
        <h2>{{ G.current_game_end_timer }}/{{G.game_end_deadline}} Prestige cards have appeared</h2>
        <h2 v-if="G.current_status_card.isPositive"> Bidding to TAKE card</h2>
        <h2 v-else> Bidding to NOT take card</h2>
        <h2>Current card</h2>
        {{  G.current_status_card }}
        <h2> Bids </h2>
        {{  G.current_bids.length > 0 ? G.current_bids : 'There are yet to be any bids.'}}
        <h2> Your current bid </h2>
        {{ G.current_bids[ctx.currentPlayer].length > 0 ? G.current_bids[ctx.currentPlayer] : 'You have yet to bid.' }}
        <h2> Your current status cards </h2>
        <p> {{ G.player_statuses[ctx.currentPlayer].length > 0 ? G.player_statuses[ctx.currentPlayer] : 'You have yet to earn a status card.'}}</p>
        <h2> Your current prestige cards </h2>
        <p> {{ G.player_prestiges[ctx.currentPlayer].length > 0 ? G.player_prestiges[ctx.currentPlayer] : 'You have yet to earn a prestige card.'}}</p>
        <h2> Your current effect cards </h2>
        <p> {{ G.player_effects[ctx.currentPlayer].length > 0 ? G.player_effects[ctx.currentPlayer] : 'You have yet to earn an effect card.'}}</p>
        <h2> Your remaining currency </h2>
        <p> {{ G.player_hands[ctx.currentPlayer].length > 0 ? G.player_hands[ctx.currentPlayer] : 'You are bankrupted!' }}</p>
      </table>
      <div v-if="ctx.gameover" id="winner">
        {{ ctx.gameover }}
        {{ ctx.gameover.winner !== undefined ? `Winner: ${ctx.gameover.winner}` : 'Draw!' }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      ctx: Object,
      G: Object,
      moves: Object,
    },
    data() {
      return {
        cellStyle: {
          border: '1px solid #555',
          width: '50px',
          height: '50px',
          lineHeight: '50px',
          textAlign: 'center',
        },
      };
    },
    methods: {
      onClick(id) {
        console.log(id);
        this.moves.pass();
      },
    },
  };
  </script>
  