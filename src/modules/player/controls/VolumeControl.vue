<template>
  <div class="hidden xs:flex items-center">
    <IconVolumeVariantOff
      v-if="isMuted"
      class="cursor-pointer text-4xl trans opacity-75 hover:opacity-100"
      @click="unMute"
    />
    <IconVolumeLow
      v-else-if="volume <= 25"
      class="cursor-pointer text-4xl trans opacity-75 hover:opacity-100"
      @click="setVolume(75)"
    />
    <IconVolumeMedium
      v-else-if="volume <= 75"
      class="cursor-pointer text-4xl trans opacity-75 hover:opacity-100"
      @click="setVolume(100)"
    />
    <IconVolumeHigh
      v-else
      class="cursor-pointer text-4xl trans opacity-75 hover:opacity-100"
      @click="mute"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import PlayersController from '@/modules/player/PlayersController'

@Component
export default class VolumeControl extends Vue {
    @State public isMuted!: boolean
    @State public volume?: number

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
}
</script>
