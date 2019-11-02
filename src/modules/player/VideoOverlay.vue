<template>
  <div
    class="VideoOverlay h-full w-full"
    :class="{ 'pointer-events-none': activeState }"
  >
    <div
      class="h-full w-full video-overlay text-gray-100 flex flex-col justify-between items-center trans"
      :class="{
        'opacity-100': isOverlayVisible,
        'opacity-0': !isOverlayVisible,
      }"
      @mousemove="enableActiveState"
    >
      <!-- top: title -->
      <div
        v-if="activePost"
        class="VideoOverlay-top xs:flex-1 flex items-start justify-between w-full"
      >
        <div class="p-2">
          <div class="flex flex-col w-full sm:w-auto">
            <div class="text-xs sm:text-lg truncate sm:overflow-visible sm:whitespace-normal font-bold">
              {{ activePost.title }}
            </div>
            <div class="hidden xs:inline-block text-xs sm:text-base font-medium text-grey-50">
              <span>{{ activePost.author }}</span> •
              <span class="text-orange-400">{{ activePost.ups }} votes</span> •
              <span class="text-teal-600">{{ activePost.num_comments }} comments</span>
            </div>
          </div>
        </div>
      </div>

      <!-- middle: prev, play, next -->
      <div class="VideoOverlay-middle flex-1 flex items-center justify-center w-full">
        <IconSkipPrevious
          class="pointer-events-auto text-4xl cursor-pointer trans"
          :class="{
            'opacity-50 pointer-events-none': !prevSong,
            'opacity-75 hover:opacity-100': !!prevSong,
          }"
          @click="playPrevSong"
        />

        <IconPause
          v-if="isPlaying"
          class="pointer-events-auto text-6xl cursor-pointer trans opacity-75 hover:opacity-100 sm:mx-8"
          @click="playPause"
        />
        <IconPlay
          v-else
          class="pointer-events-auto text-6xl cursor-pointer trans opacity-75 hover:opacity-100 sm:mx-8"
          @click="playPause"
        />

        <IconSkipNext
          class="pointer-events-auto text-4xl cursor-pointer trans"
          :class="{
            'opacity-50 pointer-events-none': !nextSong,
            'opacity-75 hover:opacity-100': !!nextSong,
          }"
          @click="playNextSong" 
        />
      </div>

      <!-- bottom: volume, seeker, fullscreen -->
      <div class="VideoOverlay-bottom xs:flex-1 flex flex-col justify-end w-full">
        <div class="pointer-events-auto flex items-center w-full p-2 xs:p-4 sm:p-6">
          <VolumeControl />
          <ProgressBar class="flex-1 xs:mx-4 sm:mx-8" />
          <IconFullscreen
            class="hidden xs:inline-flex cursor-pointer text-4xl trans opacity-75 hover:opacity-100"
            @click="toggleFullscreen"
          />
        </div>

        <!-- bottom components via slot -->
        <slot name="bottom" />
      </div>
    </div>

    <MiniProgressBar
      v-if="activePost"
      class="absolute bottom-0"
      :class="{
        'opacity-100': !isOverlayVisible,
        'opacity-0': isOverlayVisible,
      }"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, State } from 'vuex-class'
import { RawPostData } from '@/typings/reddit'
import PlayersController from '@/modules/player/PlayersController'
import PlaylistController from '@/modules/playlist/PlaylistController'
import VolumeControl from '@/modules/player/controls/VolumeControl.vue'
import MiniProgressBar from '@/modules/player/controls/progress-bar/MiniProgressBar.vue'
import ProgressBar from '@/modules/player/controls/progress-bar/ProgressBar.vue'
import debounce from 'lodash/debounce'
import { formatDistanceToNow, toDate } from 'date-fns'

@Component({
    components: {
        VolumeControl,
        MiniProgressBar,
        ProgressBar,
    },
    filters: {
        formatDistanceToNow,
        toDate,
    },
})
export default class VideoOverlay extends Vue {
    @State public activePost?: RawPostData
    @Getter public isPlaying!: boolean
    @Getter public prevSong?: RawPostData
    @Getter public nextSong?: RawPostData

    public activeState = false

    constructor() {
        super()
        const FADE_DURATION = process.env.NODE_ENV === 'production' ? 5000 : 30000
        this.disableActiveState = debounce(this.disableActiveState.bind(this), FADE_DURATION)
    }

    public playPause() {
        PlayersController.playPause()
    }

    public playNextSong() {
        PlaylistController.playNextSong()
    }

    public playPrevSong() {
        PlaylistController.playPrevSong()
    }

    public toggleFullscreen() {
        try {
            if (document.fullscreenElement) {
                document.exitFullscreen()
            } else {
                document.documentElement.requestFullscreen()
            }
        } catch (e) {
            console.error('Could not enable fullscreen', { e })
        }
    }

    public enableActiveState() {
        // we have hovered over the element, so it's actively being hovered of
        // so we should increase opacity and enable controls
        this.activeState = true
        this.disableActiveState()
    }

    private disableActiveState() {
        this.activeState = false
    }

    private get isOverlayVisible() {
        if (this.activeState) {
            return true
        }

        if (!this.isPlaying) {
            return true
        }

        return false
    }
}
</script>
