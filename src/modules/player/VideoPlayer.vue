<template>
    <div class="h-full w-full relative">
        <div :class="{ 'hide-player': !isYoutubePlaying }">
            <YoutubePlayerFrame
                class="absolute"
                :style="{ background: '#000' }"
            />
        </div>
        <div :class="{ 'hide-player': !isSoundcloudPlaying }">
            <SoundcloudPlayerFrame
                class="absolute"
                :style="{ background: '#000' }"
            />
        </div>
        <VideoOverlay class="absolute z-10" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, State, Action } from 'vuex-class'
import { RawPostData } from '@/typings/reddit'
import YoutubePlayerFrame from '@/modules/player/YoutubePlayerFrame.vue'
import SoundcloudPlayerFrame from '@/modules/player/SoundcloudPlayerFrame.vue'
import VideoOverlay from '@/modules/player/VideoOverlay.vue'
import './PlayersController'
import isYoutubeType from '../playlist/util/isYoutubeType';
import isSoundcloudType from '../playlist/util/isSoundcloudType';

@Component({
    components: {
        YoutubePlayerFrame,
        SoundcloudPlayerFrame,
        VideoOverlay,
    },
})
export default class VideoPlayer extends Vue {
    @State public activePost?: RawPostData

    public get isYoutubePlaying() {
        return isYoutubeType(this.activePost)
    }

    public get isSoundcloudPlaying() {
        return isSoundcloudType(this.activePost)
    }
}
</script>
