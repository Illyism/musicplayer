<template>
  <!--
    This route just renders the VideoPlayer component
    where all the real logic is!
  -->
  <VideoPlayer />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VideoPlayer from '@/modules/player/VideoPlayer.vue'

// load the PlayersControllers
// this module communicates with all the youtube/soundcloud APIs
import '@/modules/player/PlayersController'

@Component({
  components: {
    VideoPlayer,
  },
})
export default class Player extends Vue {
}
</script>
