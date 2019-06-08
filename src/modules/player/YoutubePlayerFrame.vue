<template>
   <iframe
        ref="player"
        class="h-full w-full"
        type="text/html"
        src="http://www.youtube.com/embed/hi4pzKvuEQM?enablejsapi=1"
    />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import YoutubeService from '@/modules/player/YoutubeService'

@Component({})
export default class YoutubePlayerFrame extends Vue {
    private service = YoutubeService

    private async mounted() {
        this.initPlayer()
    }

    private initPlayer() {
        YoutubeService.initYoutube(this.$refs.player as HTMLElement)
        YoutubeService.player!.loadVideoById('hi4pzKvuEQM')
        YoutubeService.player!.playVideo()
    }
}
</script>
