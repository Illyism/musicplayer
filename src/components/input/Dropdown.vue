<template>
  <popper
    ref="popper"
    trigger="clickToOpen"
    :append-to-body="true"
    :options="{
      modifiers: { offset: { offset: '0,10px' } }
    }"
  >
    <div
      slot="reference"
      class="relative inline-block"
    >
      <button
        class="inline-flex items-center pl-4 pr-2 py-2 font-semibold text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:bg-gray-700 active:bg-gray-700"
        :class="triggerClasses"
      >
        <slot name="label" />
        <IconChevronDown
          class="ml-2 text-white mdi-fix"
        />
      </button>
    </div>

    <transition
      enter-class="opacity-0 scale-90"
      enter-active-class="ease-out transition-fastest"
      enter-to-class="opacity-100 scale-100"
      leave-class="opacity-100 scale-100"
      leave-active-class="ease-in transition-fastest"
      leave-to-class="opacity-0 scale-90"
    >
      <div
        class="popper z-40 w-64 text-left bg-gray-900 text-gray-100 border border-black rounded-lg shadow-lg"
      >
        <slot />
      </div>
    </transition>
  </popper>
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';
import Popper from 'vue-popperjs'

@Component({
    components: {
        Popper,
    },
})
export default class Dropdown extends Vue {
    @Prop({}) public triggerClasses !: string

    public doClose() {
      if (this.$refs.popper) {
        (this.$refs.popper as any).doClose()
      }
    }
}
</script>
