<template>
<h2> Your current bid </h2>
<p>{{ currentPlayerBids > 0 ? currentPlayerBids : 'You have yet to bid.' }}</p>
<h2> Your current status cards </h2>
<p> {{ currentPlayerStatuses > 0 ? currentPlayerStatuses : 'You have yet to earn a status card.'}}</p>
<h2> Your current prestige cards </h2>
<p> {{ currentPlayerPrestiges > 0 ? currentPlayerPrestiges : 'You have yet to earn a prestige card.'}}</p>
<h2> Your current effect cards </h2>
<p> {{ currentPlayerEffects > 0 ? currentPlayerEffects : 'You have yet to earn an effect card.'}}</p>
<h2> Your remaining currency </h2>
<p> {{ currentPlayerHand.length > 0 ? currentPlayerHand : 'You are bankrupted!' }}</p>
</template>
<script>
 export default {
    props: {
        currentPlayerBids: Object,
        currentPlayerStatuses: Object,
        currentPlayerPrestiges: Object,
        currentPlayerEffects: Object,
        currentPlayerHand: Object
    }
 }
</script>