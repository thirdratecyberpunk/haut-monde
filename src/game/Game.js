/* eslint-disable no-unused-vars */
import { INVALID_MOVE } from 'boardgame.io/core';

// deck of possible status cards (victory points)
// var DEFAULT_LUXURY_VALUES = [1,2,3,4,5,6,7,8,9,10]; 
var DEFAULT_LUXURY_VALUES = [1,2,3]; 
// deck of possible prestige cards (VP modifier multipliers)
// var DEFAULT_PRESTIGE_VALUES = [2,2,2,0.5];
var DEFAULT_PRESTIGE_VALUES = [2,2,2];
// default currency distribution
var DEFAULT_CURRENCY_DISTRIBUTION = [1,2,3,4,6,8,10,12,15,20,25];
// var DEFAULT_CURRENCY_DISTRIBUTION = [1,2,3];
// how many green cards have to be revealed before game immediately ends
var DEFAULT_GAME_END_DEADLINE = 2;

/**
 * Function that generates Luxury cards
 * @param {*} value -> integer value to define card as
 * @returns 
 */
const createLuxuryCard = (value) => ({
  type: "LuxuryCard", // helps identify the card type if needed
  value: value,
  incrementsGameEnd: false,
  isPositive: (value > 0),
  endOfRoundEffect: null,
});

/**
 * Function that generates Prestige cards
 * @param {*} value -> integer value to define card as
 * @returns 
 */
const createPrestigeCard = (value) => ({
  type: "PrestigeCard", // helps identify the card type if needed
  value: value,
  incrementsGameEnd: true,
  isPositive: (value > 1),
  endOfRoundEffect: null,
});


const setupStatusDeck = () => {
  let finalDeck = [];

  let statusDeck = DEFAULT_LUXURY_VALUES.map((card) => createLuxuryCard(card));
  let prestigeDeck = DEFAULT_PRESTIGE_VALUES.map((card) => createPrestigeCard(card));

  finalDeck = finalDeck.concat(statusDeck);
  finalDeck = finalDeck.concat(prestigeDeck);

  return finalDeck;
};

/**
 * Returns the sum of the array
 * @param {*} arrayToSum 
 * @returns 
 */
const sumArray = (arrayToSum) => {
  if (arrayToSum === undefined || arrayToSum.length == 0){
    return 0;
  }
  else{
    return arrayToSum.reduce((a,b) => a + b, 0);
  }
}


/**
 * Given an array of arrays, returns the sum of the sub array with the largest sum
 * @param {*} arr 
 * @returns 
 */
const maxSubArraySum = (arr) => {
  if (!arr || arr.length === 0) return null;

  let maxSum = sumArray(arr[0]);

  for (let i = 1; i < arr.length; i++) { // Start loop from the second element
      const subArraySum = sumArray(arr[i]);
      maxSum = Math.max(maxSum, subArraySum);
  }

  return maxSum;
}

/**
 * Given an array of arrays, returns the sum of the sub array with the smallest sum
 * @param {*} arr 
 * @returns 
 */
const minSubArraySum = (arr) => {
  if (!arr || arr.length === 0) return null;

  let minSum = sumArray(arr[0]);

  for (let i = 1; i < arr.length; i++) { // Start loop from the second element
      const subArraySum = sumArray(arr[i]);
      minSum = Math.min(minSum, subArraySum);
  }

  return minSum;
}

/**
 * Returns an array of all elements in arr1 that don't appear in arr2
 * @param {*} arr1 
 * @param {*} arr2 
 * @returns 
 */
const removeElements = (arr1, arr2) => {
  return arr1.filter(item => !arr2.includes(item));
}

const hasOnlyOneNonPassSubArray = (arr) => {
  // Filter sub-arrays that do NOT contain "PASS"
  const nonPassSubArrays = arr.filter(subArray => 
      Array.isArray(subArray) && !subArray.includes("PASS")
  );

  // Check if there is exactly one such sub-array
  return nonPassSubArrays.length === 1;
}

/**
 * Returns the index of the sub array that doesn't contain the string "PASS"
 * @param {*} arr 
 * @returns 
 */
const findNonPassIndex = (arr) => {
  return arr.findIndex(subArray => Array.isArray(subArray) && !subArray.includes("PASS"));
}

/**
 * Returns the product of an array of numbers
 * @param {*} prestiges 
 * @returns 
 */
const calculatePrestigeProduct = (prestiges) => {
  if (prestiges === undefined || prestiges.length == 0){
    return 1;
  }
  else{
    let prestigeModifier = 1;
    for (let i = 0; i < prestiges.length; i++){
      console.log(prestiges[i]);
      prestigeModifier = prestigeModifier * prestiges[i].value;
    }
    console.log(`prestigeModifier: ${prestigeModifier}`);
    return prestigeModifier;
  }
}

/**
 * Given an array of status objects, returns the sum of the
 * values of the array
 * @param {*} statuses 
 * @returns 
 */
const sumValuesOfStatuses = (statuses) => {
  if (statuses === undefined || statuses.length == 0){
    return 0;
  }
  else{
    let statusScore = 0;
    for (let i = 0; i < statuses.length; i++){
      statusScore += statuses[i].value;
    }
    console.log(`statusScore: ${statusScore}`);
    return statusScore;
  }
}

/**
 * Given the array of status cards acquired
 * and an array of prestige cards acquired, 
 * returns the final score (sum of status cards * sum of prestige cards)
 * @param {*} statuses 
 * @param {*} prestiges 
 */
const calculatePlayerScore = (statuses, prestiges) => {
  return (sumValuesOfStatuses(statuses) * calculatePrestigeProduct(prestiges));
}

var status_deck = setupStatusDeck();

export const HautMonde = {
  setup: ({ctx, random}) => ({
    status_deck: random.Shuffle(status_deck),
    current_status_card: null,
    current_game_end_timer : 0,
    current_round: 0,
    last_player: null,
    // TODO: make these get passed in from lobby configuration screen
    game_end_deadline: DEFAULT_GAME_END_DEADLINE,
    player_hands: Array(ctx.numPlayers).fill(DEFAULT_CURRENCY_DISTRIBUTION),
    current_bids: Array(ctx.numPlayers).fill([]),
    player_statuses: Array(ctx.numPlayers).fill([]),
    player_prestiges: Array(ctx.numPlayers).fill([]),
  }),
  minPlayers: 3,
  maxPlayers: 6,
  phases: {
    // draws the card for auction and checks if game should end
    drawNextStatusCard: {
      onBegin: ({G, ctx, events}) => {
        console.log('Drawing next status card');
        G.current_status_card = G.status_deck.pop();
        if (G.current_status_card.incrementsGameEnd){
          G.current_game_end_timer++;
        }
        G.current_round++;
        if (G.last_player != null){
          ctx.currentPlayer = G.last_player;
        }

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
        console.log('Starting a positive auction');
      },
      moves: {
        // player takes any money cards they bid back into hand
        // and folds out of this auction
        // (this ends the auction if there is only one player who 
        // hasn't folded)
        pass: ({G, ctx, events}) => {
          G.player_hands[ctx.currentPlayer].concat(G.current_bids[ctx.currentPlayer]);
          G.current_bids[ctx.currentPlayer] = ["PASS"];
          if (hasOnlyOneNonPassSubArray(G.current_bids)){
            // gives the status card to the player who hasn't passed
            let auction_winner_index = findNonPassIndex(G.current_bids);
            if (G.current_status_card.type == "LuxuryCard"){
              G.player_statuses[auction_winner_index].push(G.current_status_card);
            }
            else if (G.current_status_card.type == "PrestigeCard"){
              G.player_prestiges[auction_winner_index].push(G.current_status_card);
            }
            G.last_player = auction_winner_index;
            // resets all bids
            G.current_bids = G.current_bids.map(() => []);
            events.endPhase();
          }
        },
        // player adds another money card from their hand into
        // their current bid assuming it's more than the last bid
        bid: ({G, ctx}, move) => {
          // checks if the move is an array of possible money cards
          if (!Array.isArray(move)){
            return INVALID_MOVE;
          }
          // checks that move is a valid array of possible cards
          // i.e. player's hand actually contains these cards
          if (!(move.every(r => G.player_hands[ctx.currentPlayer].includes(r)))){
            return INVALID_MOVE;
          }
          // add the cards included in the move to the player's current bid
          let newMove = G.current_bids[ctx.currentPlayer].concat(move);
          // checks that the sum of the new bid is greater than the current biggest bid
          if (sumArray(newMove) <= maxSubArraySum(G.current_bids)){
            return INVALID_MOVE;
          }
          // sets the current bid to be 
          G.current_bids[ctx.currentPlayer] = newMove;
          // removes the cards added in the bid from the player's hand
          G.player_hands[ctx.currentPlayer] = removeElements(G.player_hands[ctx.currentPlayer],move);
        }
      },
      turn: {minMoves: 1, maxMoves: 1},
      next: ({G, ctx}) => {
        // triggers next auction
        return 'drawNextStatusCard';
      },
    },
    // phase where players are paying to avoid taking the card
    negativeAuction: {
      onBegin: ({G, ctx}) => {
        console.log('Starting a negative auction');
      },
      moves: {
        // player takes any cards they've played back into hand 
        // and ends this phase
        pass: ({G, ctx}) => {
        },
        // player adds another money card from their hand into
        // their current bid assuming it's more than the last bid
        bid: ({G, ctx}) => {
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
    }
  },
  endIf: ({G, ctx}) => {
    if ((G.current_game_end_timer == G.game_end_deadline) || (G.status_deck.length === 0)){
      let result = {winner: null, castOut: null, finalScores: []};

      // include all player's final money counts
      let finalHands = G.player_hands;
      result.finalHands = finalHands;
      result.finalStatuses = G.player_statuses;
      result.finalPrestiges = G.player_prestiges;

      // calculate all player's final scores
      let finalScores = [];
      let possible_winners = Array(ctx.numPlayers).fill(0).map((_, index) => index);
      for (let i = 0; i < ctx.numPlayers; i++){
        finalScores[i] = calculatePlayerScore(G.player_statuses[i], G.player_prestiges[i])
      }
      let bestScore = Math.max(...finalScores);
      result.finalScores = finalScores;
      // first, cast out the player(s) with the lowest remaining money
      const { filteredIn, filteredOut } = possible_winners.reduce(
          (acc, index) => {
              if (sumArray(G.player_hands[index]) > minSubArraySum(G.player_hands)) {
                  acc.filteredIn.push(index);
              } else {
                  acc.filteredOut.push(index);
              }
              return acc;
          },
          { filteredIn: [], filteredOut: [] }
      );

      result.castOut = filteredOut;
      possible_winners = filteredIn;

      if (possible_winners.length != 0){
        // then, checks for highest status
        possible_winners = possible_winners.filter((index) => finalScores[index] == bestScore);
        if (possible_winners.length == 1){
          result.winner = possible_winners[0];
        }
        else{
          // if tied, checks for players with most money left
          possible_winners = possible_winners.filter((index) => sumArray(G.player_hands[index]) == maxSubArraySum(G.player_hands));
          if (possible_winners.length == 1){
            result.winner = possible_winners[0];
          }
          else{
            // if tied, checks for player with single most valuable luxury card
            // possible_winners.filter((index) => G.player_statuses[index] == maxSubArraySum(G.player_hands));
            let largestValue = -Infinity;
            let indexOfLargestValue = -Infinity;
            for (var i = 0; i < ctx.numPlayers; i++){
                // sort the array in descending order
                // then check if the first value in the sorted list is bigger than the last
                // biggest value seen
                if (G.player_statuses[i].length > 0){
                    let currentStatuses = G.player_statuses[i].slice().sort((a,b) => b.value - a.value);
                    if (currentStatuses[0].value > largestValue){
                      largestValue = currentStatuses[0].value;
                      indexOfLargestValue = i;
                    }
                }
              }
              result.winner = possible_winners[0];
            }
          }
        }
        return result;
      }
    },
}