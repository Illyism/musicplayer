<template>
  <div class="VideoPlayer h-screen w-full relative">
    <ServiceFrames class="absolute z-10" />
    <VideoOverlay class="absolute z-20">
      <div
        slot="bottom"
        class="flex items-center p-2 xs:p-4 sm:p-6 pt-0 xs:pt-0 sm:pt-0"
      >
        <PlaylistContainer class="pointer-events-auto" />
        <SortToggle class="pointer-events-auto" />
        <SubredditContainer class="pointer-events-auto" />
      </div>
    </VideoOverlay>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VideoOverlay from '@/modules/player/VideoOverlay.vue'
import ServiceFrames from '@/modules/player/ServiceFrames.vue'
import SubredditContainer from '@/modules/subs/SubredditContainer.vue'
import SortToggle from '@/modules/playlist/SortToggle.vue'
import PlaylistContainer from '@/modules/playlist/PlaylistContainer.vue'

@Component({
    components: {
        VideoOverlay,
        ServiceFrames,
        SubredditContainer,
        SortToggle,
        PlaylistContainer,
    },
})
export default class VideoPlayer extends Vue {
}
</script>
