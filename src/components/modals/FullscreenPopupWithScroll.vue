<template>
  <FullscreenPopup
    :isMenuOpen="isMenuOpen"
    @onCloseMenuClicked="onCloseMenuClicked"
  >
    <div class="flex items-center justify-between pl-6 pr-2 bg-gray-800 rounded-t-lg">
      <div class="text-gray-100 font-medium py-2">
        {{ title }}
      </div>
      <div
        class="h-8 w-8 flex items-center justify-center hover:bg-gray-700 rounded text-gray-100 cursor-pointer"
        @click="onCloseMenuClicked"
      >
        <IconClose class="" />
      </div>
    </div>
    <div class="overflow-y-scroll p-4">
      <slot />
    </div>
  </FullscreenPopup>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import FullscreenPopup from '@/components/modals/FullscreenPopup.vue'

@Component({
  components: {
    FullscreenPopup,
  },
})
export default class FullscreenPopupWithScroll extends Vue {
  @Prop({ default: false }) public isMenuOpen!: boolean
  @Prop({ default: '' }) public title!: string
  public onCloseMenuClicked() {
    this.$emit('onCloseMenuClicked')
  }
}
</script>
