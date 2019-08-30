<template>
   <div class="w-full h-full flex items-center justify-center text-xs xs:text-base">
       <div>{{ progressCurrent | formatSeconds }}</div>
       <div class="relative w-full h-2 mx-4">
            <div class="absolute w-full h-full rounded-full bg-gray-900"></div>
            <div
                class="absolute h-full rounded-full bg-gray-800"
                :style="loadedVolumeStyles"
            ></div>
            <div
                class="absolute h-full rounded-full bg-primary-600"
                :style="currentVolumeStyles"
            ></div>

            <div
                class="absolute h-4 w-4 -ml-1 -mt-1 rounded-full bg-primary-600 cursor-grab"
                :style="seekBarStyles"
            ></div>
       </div>
       <div>{{ progressDuration | formatSeconds }}</div>
   </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'
import PlayersController from './PlayersController'
import formatSeconds from './util/formatSeconds'

@Component({
    filters: {
        formatSeconds,
    },
})
export default class ProgressBar extends Vue {
    @State public isMuted!: boolean
    @State public volume!: number

    @State public progressDuration!: number
    @State public progressCurrent!: number
    @State public progressLoaded!: number

    public setVolume(newVolume: number) {
        PlayersController.setVolume(newVolume)
    }

    public mute() {
        PlayersController.mute()
        PlayersController.setVolume(0)
    }

    public unMute() {
        PlayersController.unMute()
        PlayersController.setVolume(25)
    }

    public get loadedVolumeStyles() {
        return {
            width: `${this.progressLoaded * 100}%`,
        }
    }

    public get currentVolumeStyles() {
        return {
            width: `${this.progressCurrentPercentage}%`,
        }
    }

    public get seekBarStyles() {
        return {
            left: `${this.progressCurrentPercentage}%`,
        }
    }

    private get progressCurrentPercentage() {
        return (this.progressCurrent / this.progressDuration) * 100
    }
}
</script>
