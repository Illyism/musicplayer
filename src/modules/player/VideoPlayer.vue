<template>
  <div class="VideoPlayer h-screen w-full relative">
    <ServiceFrames class="absolute z-10" />
    <VideoOverlay class="absolute z-20">
      <div
        slot="bottom"
        class="flex items-center p-2 xs:p-4 sm:p-6 pt-0 xs:pt-0 sm:pt-0"
      >
        <PlaylistContainer class="pointer-events-auto" />
        <ChannelsPicker class="pointer-events-auto" />
        <div class="ml-4 xs:h-24 xs:w-24 text-xs xs:text-sm leading-tight p-2 rounded border border-gray-800 bg-gray-900 text-white flex flex-col justify-end cursor-pointer trans hover:border-primary-800">
          Hello JAM
        </div>
      </div>
    </VideoOverlay>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VideoOverlay from '@/modules/player/VideoOverlay.vue'
import ServiceFrames from '@/modules/player/ServiceFrames.vue'
import ChannelsPicker from '@/modules/channels/ChannelsPicker.vue'
import SortToggle from '@/modules/channels/SortToggle.vue'
import PlaylistContainer from '@/modules/playlist/PlaylistContainer.vue'

@Component({
    components: {
        VideoOverlay,
        ServiceFrames,
        ChannelsPicker,
        SortToggle,
        PlaylistContainer,
    },
})
export default class VideoPlayer extends Vue {
}
</script>
