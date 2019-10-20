<template>
  <portal :disabled="disablePortal">
    <transition
      enter-class="opacity-0 scale-90"
      enter-active-class="ease-out transition-fastest"
      enter-to-class="opacity-100 scale-100"
      leave-class="opacity-100 scale-100"
      leave-active-class="ease-in transition-fastest"
      leave-to-class="opacity-0 scale-90"
      appear
      @afterLeave="disablePortal = true"
    >
      <slot v-if="showTransitionContent" />
    </transition>
  </portal>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class PortalWithFade extends Vue {
    @Prop({ default: false }) public isMenuOpen !: boolean

    public showTransitionContent = false
    public disablePortal = false

    public created() {
      this.onMenuOpenChanged()
    }

    @Watch('isMenuOpen')
    public onMenuOpenChanged() {
      if (this.isMenuOpen) {
        this.disablePortal = false
        this.showTransitionContent = true
        return
      }

      // setting this to false will trigger the afterLeave transition
      this.showTransitionContent = false
    }
}
</script>