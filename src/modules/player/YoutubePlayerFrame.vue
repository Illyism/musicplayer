<template>
   <iframe
        ref="player"
        class="h-full w-full"
        type="text/html"
        :src="src"
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

    private get src() {
        const params = [
            ['enablejsapi', 1],
            ['controls', 0],
            ['disablekb', 1],
            ['modestbranding', 1],
            ['showinfo', 0],
            ['rel', 0],
            ['iv_load_policy', 3],
            ['origin', window.location.origin],
        ]

        const paramsStr = params.map((p) => p.join('=')).join('&')
        return `https://www.youtube.com/embed/hi4pzKvuEQM?${paramsStr}`
    }

    private initPlayer() {
        YoutubeService.initYoutube(this.$refs.player as HTMLElement)
        YoutubeService.player!.loadVideoById('hi4pzKvuEQM')
        YoutubeService.player!.playVideo()
    }
}
</script>
