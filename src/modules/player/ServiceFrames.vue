<template>
  <div class="ServiceFrames h-full w-full">
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
    <div
      v-if="notPlaying"
      class="absolute w-full h-full bg-black"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import YoutubePlayerFrame from '@/modules/player/services/youtube/YoutubePlayerFrame.vue'
import SoundcloudPlayerFrame from '@/modules/player/services/soundcloud/SoundcloudPlayerFrame.vue'
import { RawPostData } from '@/typings/reddit'
import isYoutubeType from '../playlist/util/isYoutubeType';
import isSoundcloudType from '../playlist/util/isSoundcloudType';

@Component({
    components: {
        YoutubePlayerFrame,
        SoundcloudPlayerFrame,
    },
})
export default class ServiceFrames extends Vue {
    @State public activePost?: RawPostData

    public get isYoutubePlaying() {
        return isYoutubeType(this.activePost)
    }

    public get isSoundcloudPlaying() {
        return isSoundcloudType(this.activePost)
    }

    public get notPlaying() {
        return !this.isYoutubePlaying && !this.isSoundcloudPlaying
    }
}
</script>
