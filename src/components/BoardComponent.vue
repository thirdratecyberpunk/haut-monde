
<template>
    <div>
      <RoundInfo :currentRound="G.current_round" :statusDeckLength="G.status_deck.length" :bids="G.current_bids"/>
      <GameTimer :currentTimer="G.current_game_end_timer" :deadline="G.game_end_deadline" />
      <CardDetails :statusCard="G.current_status_card" />
      <PlayerStats
      :currentPlayerEffects="G.player_effects[ctx.currentPlayer]"
      :currentPlayerStatusCards="G.player_statuses[ctx.currentPlayer]"
      :currentPlayerPrestigeCards="G.player_prestiges[ctx.currentPlayer]"
      :currentPlayerHand="G.player_hands[ctx.currentPlayer]"
      />
      <BidForm
      :currentPlayerHand="G.player_hands[ctx.currentPlayer]"
      :currentPlayer="ctx.currentPlayer"
      :moves="moves"
      >
      </BidForm>
      <GameOutcome v-if="ctx.gameover" :gameover="ctx.gameover" />
    </div>
  </template>
  
  <script>
  import RoundInfo from './RoundInfo.vue';
  import GameTimer from './GameTimer.vue';
  import CardDetails from './CardDetails.vue';
  import PlayerStats from './PlayerStats.vue';
  import GameOutcome from './GameOutcome.vue';
  import BidForm from './BidForm.vue';

  export default {
    props: {
      ctx: Object,
      G: Object,
      moves: Object,
    },
    components: {
      RoundInfo,
      GameTimer,
      CardDetails,
      GameOutcome,
      PlayerStats,
      BidForm,
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
  