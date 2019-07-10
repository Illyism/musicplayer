<template>
    <div class="h-full w-full relative">
        <div v-show="isYoutubePlaying" >
            <YoutubePlayerFrame class="absolute" :style="{ background: '#000' }" />
        </div>
        <VideoOverlay class="absolute z-10" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, State, Action } from 'vuex-class'
import { RawPostData } from '@/typings/reddit'
import YoutubePlayerFrame from '@/modules/player/YoutubePlayerFrame.vue'
import VideoOverlay from '@/modules/player/VideoOverlay.vue'
import './PlayersController'
import isYoutubeType from '../playlist/util/isYoutubeType';

@Component({
    components: {
        YoutubePlayerFrame,
        VideoOverlay,
    },
})
export default class VideoPlayer extends Vue {
    @State public activePost?: RawPostData

    public get isYoutubePlaying() {
        console.log('isYoutubePlaying')
        return isYoutubeType(this.activePost)
    }
}
</script>
