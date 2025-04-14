
<template>
  <h1> Board component</h1>
    <div>
      <table id="board">
        <tbody>
          <tr v-for="row in 3" :key="row">
            <td
              v-for="col in 3"
              :key="3 * (row - 1) + (col - 1)"
              @click="onClick(3 * (row - 1) + (col - 1))"
            >
              <div
                v-if="G.cells[3 * (row - 1) + (col - 1)]"
                :style="cellStyle"
              >
                {{ G.cells[3 * (row - 1) + (col - 1)] }}
              </div>
              <button
                v-else
                :style="cellStyle"
                @click="onClick(3 * (row - 1) + (col - 1))"
              />
            </td>
          </tr>
        </tbody>
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
        this.moves.clickCell(id);
      },
    },
  };
  </script>
  