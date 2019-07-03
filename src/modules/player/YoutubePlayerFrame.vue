<template>
   <div
        ref="player"
        class="h-full w-full"
    />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import YoutubeService from '@/modules/player/YoutubeService'

@Component
export default class YoutubePlayerFrame extends Vue {
    public service = YoutubeService

    public async mounted() {
        await YoutubeService.init(this.$refs.player as HTMLElement)
    }

    public async beforeDestroy() {
        await YoutubeService.beforeDestroy()
    }
}
</script>
