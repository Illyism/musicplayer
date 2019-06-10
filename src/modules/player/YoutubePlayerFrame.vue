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
    private service = YoutubeService

    private async mounted() {
        YoutubeService.init(this.$refs.player as HTMLElement)
    }
}
</script>
