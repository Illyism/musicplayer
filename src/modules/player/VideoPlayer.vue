<template>
    <YoutubePlayerFrame />
</template>

<script lang="ts">
import Vue from 'vue'
import YoutubePlayerFrame from '@/modules/player/YoutubePlayerFrame.vue'

export default Vue.extend({
    components: {
        YoutubePlayerFrame,
    },
})
</script>
