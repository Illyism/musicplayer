<template>
  <PortalWithFade
    :isMenuOpen="isMenuOpen"
    @onMenuOpenFinished="onMenuOpenFinished"
  >
    <div
      class="fixed inset-0 px-2 py-2 sm:py-12 z-30" 
    >
      <div
        class="fixed inset-0 bg-overlay-floating"
        @click="onCloseMenuClicked"
      />
      <div
        class="relative w-full h-full max-w-xl mx-auto pointer-events-auto shadow-xl rounded-lg bg-gray-900 flex flex-col"
      >
        <slot />
      </div>
    </div>
  </PortalWithFade>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import PortalWithFade from '@/components/modals/PortalWithFade.vue'

@Component({
  components: {
    PortalWithFade,
  },
})
export default class FullscreenPopup extends Vue {
  @Prop({ default: false }) public isMenuOpen!: boolean

  public onCloseMenuClicked() {
    this.$emit('onCloseMenuClicked')
  }

  public onMenuOpenFinished() {
    this.$emit('onMenuOpenFinished')
  }
}
</script>
