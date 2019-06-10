<template>
    <YoutubePlayerFrame :style="{ background: '#000' }" />
</template>

<script lang="ts">
import Vue from 'vue'
import YoutubePlayerFrame from '@/modules/player/YoutubePlayerFrame.vue'
import './PlayersController'

export default Vue.extend({
    components: {
        YoutubePlayerFrame,
    },
})
</script>
