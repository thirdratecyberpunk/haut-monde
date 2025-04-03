import { Client } from 'boardgame.io/client';
import { TicTacToe } from './Game';

class TicTacToeClient {
  constructor() {
    this.client = Client({ game: TicTacToe });
    this.client.start();
    this.client.subscribe(state => this.update(state));
    console.log(this.client);
  }

  update(state){
    // alert('updated');
    // alert(JSON.stringify(state));
    // console.log(state);
    this.state = state;
    // alert(JSON.stringify(this.state));
    // console.log(this.state);
  }
}

const tttclient = new TicTacToeClient();
export { tttclient };