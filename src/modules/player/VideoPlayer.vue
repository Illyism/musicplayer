<template>
    <div class="h-full w-full relative">
        <YoutubePlayerFrame class="absolute" :style="{ background: '#000' }" />
        <VideoOverlay class="absolute z-10" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import YoutubePlayerFrame from '@/modules/player/YoutubePlayerFrame.vue'
import VideoOverlay from '@/modules/player/VideoOverlay.vue'
import './PlayersController'

export default Vue.extend({
    components: {
        YoutubePlayerFrame,
        VideoOverlay,
    },
})
</script>
