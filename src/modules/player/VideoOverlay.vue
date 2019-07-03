<template>
   <div
        v-if="activePost"
        class="h-full w-full video-overlay text-gray-100 flex flex-col justify-between items-center bg-black trans trans-slow"
        :class="{
            'opacity-100': isOverlayVisible,
            'opacity-0': !isOverlayVisible,
            'pointer-events-none': activeState
        }"
        @mousemove="enableActiveState"
    >
        <div class="flex-1 px-4 pt-4 flex flex-col items-start w-full">
            <div class="text-xl font-bold">{{ activePost.title }}</div>
            <div class="font-medium text-grey-50">
                <span class="text-orange-400">{{ activePost.ups }}</span> •
                <span>{{ activePost.author }}</span> •
                <span>{{ activePost.subreddit }}</span> •
                <span>{{ (activePost.created_utc * 1000) | distanceInWordsToNow }} ago</span> •
                <span>{{ activePost.domain }}</span> •
                <span class="text-teal-600">{{ activePost.num_comments }}</span>
            </div>
        </div>

        <div class="flex-1 flex items-center">
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
                class="pointer-events-auto text-6xl cursor-pointer trans opacity-75 hover:opacity-100"
                @click="playPause"
            />
            <IconPlay
                v-else
                class="pointer-events-auto text-6xl cursor-pointer trans opacity-75 hover:opacity-100"
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

        <div class="flex-1 flex items-end w-full">
            <div class="flex items-center w-full p-6 pointer-events-auto">
                <VolumeControl />
                <ProgressBar class="flex-1 mx-8" />
                <IconFullscreen
                    class="cursor-pointer text-4xl trans opacity-75 hover:opacity-100"
                    @click="toggleFullscreen"
                />
            </div>
        </div>
   </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter, State } from 'vuex-class'
import { RawPostData } from '@/typings/reddit'
import PlayersController from './PlayersController'
import PlaylistController from '@/modules/playlist/PlaylistController'
import VolumeControl from './VolumeControl.vue'
import ProgressBar from './ProgressBar.vue'
import debounce from 'lodash/debounce'
import { distanceInWordsToNow } from 'date-fns'

@Component({
    components: {
        VolumeControl,
        ProgressBar,
    },
    filters: {
        distanceInWordsToNow,
    },
})
export default class VideoOverlay extends Vue {
    @State public activePost?: RawPostData
    @Getter public isPlaying!: boolean
    @Getter public prevSong?: RawPostData
    @Getter public nextSong?: RawPostData

    public activeState: boolean = false

    constructor() {
        super()
        this.disableActiveState = debounce(this.disableActiveState.bind(this), 3000)
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

    public async toggleFullscreen() {
        try {
            // @ts-ignore
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

<style scoped>
.video-overlay {
    background: linear-gradient(rgba(0,0,0,.8) 0%,rgba(0,0,0,.2) 30%,rgba(0,0,0,.2) 70%,rgba(0,0,0,.8) 100%);
}
</style>
