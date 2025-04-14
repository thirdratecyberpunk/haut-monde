// import { INVALID_MOVE } from 'boardgame.io/core';

// deck of possible status cards
var DEFAULT_LUXURY_VALUES = [1,2,3,4,5,6,7,8,9,10]; 
// default currency distribution
var DEFAULT_CURRENCY_DISTRIBUTION = [1,2,3,4,6,8,10,12,15,20,25];
// how many green cards have to be revealed before game immediately ends
var DEFAULT_GAME_END_DEADLINE = 4;

/**
 * Function that generates Luxury cards
 * @param {*} value -> integer value to define card as
 * @returns 
 */
const createLuxuryCard = (value) => ({
  type: "LuxuryCard", // helps identify the card type if needed
  value: value,
  incrementsGameEnd: false,
  isPositive: true,
  endOfRoundEffect: null,
});

const setupStatusDeck = () => {
  let statusDeck = DEFAULT_LUXURY_VALUES.map((card) => createLuxuryCard(card));
  return statusDeck;
};

// TODO: figure out how to pass through the number of players from game state when
// initialised
const setupPlayerHands = () => {
  let player_hands = [];
  for (let i = 0; i !== 2; i++){
    player_hands[i] = DEFAULT_CURRENCY_DISTRIBUTION;
  }
  return player_hands;
}

var status_deck = setupStatusDeck();
var player_hands = setupPlayerHands();

export const HautMonde = {
  setup: ({random}) => ({
    status_deck: random.Shuffle(status_deck),
    current_status_card: null,
    current_game_end_timer : 0,
    current_round: 0,
    game_end_deadline: DEFAULT_GAME_END_DEADLINE,
    player_hands: player_hands,
    current_bids: []
  }),
  phases: {
    // draws the card for auction and checks if game should end
    drawNextStatusCard: {
      onBegin: ({G, ctx, events}) => {
        console.log(G, ctx);
        console.log('Drawing next status card');
        G.current_status_card = G.status_deck.pop();
        if (G.current_status_card.incrementsGameEnd){
          G.current_game_end_timer++;
        }
        G.current_round++;
        // TODO: set the starting player to the last player to go before this phase
        // as ending a phase ends that player's turn

        // then, moves onto the next auction phase
        events.endPhase();
      },
      next: ({G}) => {
        // checks what auction to hold
        return G.current_status_card.isPositive ? 'positiveAuction' : 'negativeAuction';
      },
      start: true
    },
    // phase where players are paying to buy the card
    positiveAuction: {
      onBegin: ({G, ctx}) => {
        console.log(G,ctx);
        console.log('Starting a positive auction');
      },
      moves: {
        // player takes any money cards they bid back into hand
        // and folds out of this auction
        // (this ends the auction if there is only one player who 
        // hasn't folded)
        pass: ({G, ctx}) => {
          console.log(G,ctx);
        },
        // player adds another money card from their hand into
        // their current bid assuming it's more than the last bid
        bid: ({G, ctx}) => {
          console.log(G,ctx);
        }
      },
      turn: {minMoves: 1, maxMoves: 1}
    },
    // phase where players are paying to avoid taking the card
    negativeAuction: {
      onBegin: ({G, ctx}) => {
        console.log(G,ctx);
        console.log('Starting a negative auction');
      },
      moves: {
        // player takes any cards they've played back into hand 
        // and ends this phase
        pass: ({G, ctx}) => {
          console.log(G,ctx);
        },
        // player adds another money card from their hand into
        // their current bid assuming it's more than the last bid
        bid: ({G, ctx}) => {
          console.log(G,ctx);
        }
      },
      turn: {minMoves: 1, maxMoves: 1}
    },
  },
  turn: {
    moveLimit: 1
  },
  moves:{
    // player chooses to pass in the current auction
    pass: ({G, ctx}) => {
      console.log(G, ctx);
    }
  },
  endIf: ({G, ctx}) => {
    console.log(ctx);
    return (G.current_game_end_timer > G.DEFAULT_GAME_END_DEADLINE) || (G.status_deck.length === 0);
  },
}