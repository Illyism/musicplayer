<template>
    <iframe
        id='soundcloud'
        ref="player"
        class="h-full w-full"
        scrolling='no'
        frameborder='0'
        allowfullscreen="1"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        src="https://w.soundcloud.com/player/?auto_play=true&hide_related=true&show_comments=true&show_user=true&show_reposts=false&visual=true"
    />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SoundcloudService from '@/modules/player/SoundcloudService'

@Component
export default class SoundcloudPlayerFrame extends Vue {
    public service = SoundcloudService

    public async mounted() {
        await SoundcloudService.init(this.$refs.player as HTMLElement)
    }

    public async beforeDestroy() {
        await SoundcloudService.beforeDestroy()
    }
}
</script>
