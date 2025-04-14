
<template>
  <h1> Board component</h1>
    <div>
      <table id="board">
        <h2>Round {{  G.current_round }} </h2>
        <h2>{{ G.current_game_end_timer }}/{{G.game_end_deadline}} green cards have appeared</h2>
        <h2 v-if="G.current_status_card.isPositive"> Bidding to TAKE card</h2>
        <h2 v-else> Bidding to NOT take card</h2>
        <tbody>
          <tr>
            <td>
              {{  G.current_status_card }}
            </td>
          </tr>
        </tbody>
        <h2> Bids </h2>
        {{  G.current_bids.length > 0 ? G.current_bids : 'There are yet to be any bids.'}}
        <h2> Your current bid </h2>
        {{ G.current_bids[ctx.currentPlayer] ?? 'You have yet to bid.' }}
        <h2> Your remaining currency </h2>
        <p> {{ G.player_hands[ctx.currentPlayer] }}</p>
      </table>
      <div v-if="ctx.gameover" id="winner">
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
  