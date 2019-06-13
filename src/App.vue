<template>
  <div id="app">
    <div class="flex flex-col md:flex-row items-stretch h-screen bg-black">
      <VideoPlayer class="flex-1" />
      <RouterView class="w-full md:w-1/3 h-screen overflow-y-scroll" />
    </div>
    <ToastOverlay />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VideoPlayer from '@/modules/player/VideoPlayer.vue'
import ToastOverlay from '@/modules/toast/view.vue'

export default Vue.extend({
  components: {
    VideoPlayer,
    ToastOverlay,
  },
})
</script>
