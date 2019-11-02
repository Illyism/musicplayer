<template>
  <div
    id="app"
    class="antialiased"
  >
    <!-- Show toast messages, should be on every page -->
    <ToastOverlay />

    <!-- Renders the routes, such as the Player -->
    <RouterView />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ToastOverlay from '@/modules/toast/view.vue'

@Component({
  components: {
    ToastOverlay,
  },
})
export default class App extends Vue {}
</script>
