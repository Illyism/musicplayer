<template>
  <div id="app">
    <OrientationLayout>
      <VideoPlayer
        slot="main"
      />

      <RouterView
        slot="side"
      />
    </OrientationLayout>

    <ToastOverlay />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VideoPlayer from '@/modules/player/VideoPlayer.vue'
import ToastOverlay from '@/modules/toast/view.vue'
import OrientationLayout from '@/layouts/OrientationLayout.vue'

@Component({
  components: {
    OrientationLayout,
    VideoPlayer,
    ToastOverlay,
  },
})
export default class App extends Vue {}
</script>
