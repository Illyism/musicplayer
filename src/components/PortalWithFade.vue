<template>
  <portal :disabled="disablePortal">
    <transition
      name="fade" 
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